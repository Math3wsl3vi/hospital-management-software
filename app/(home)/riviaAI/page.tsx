"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/configs/firebase.config';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge'; // Updated import
import { Skeleton } from '@/components/ui/skeleton';

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  checkup: string;
  date: Timestamp;
  time: string;
  status: 'scheduled' | 'confirmed' | 'cancelled';
  createdAt?: Timestamp;
}

interface DoctorNote {
  id: string;
  patientId: string;
  medication: string;
}

interface ProcurementItem {
  medication: string;
  quantity: number;
  lastUpdated: Timestamp;
}

interface HospitalInsight {
  title: string;
  description: string;
  type: 'trend' | 'warning' | 'recommendation';
}

const RiviaAI = () => {
  const { toast } = useToast();
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [medicationTrends, setMedicationTrends] = useState<{ med: string; count: number }[]>([]);
  const [procurementData, setProcurementData] = useState<ProcurementItem[]>([]);
  const [insights, setInsights] = useState<HospitalInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentDate = useMemo(() => new Date('2025-09-18'), []);

// Fetch upcoming appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const q = query(
          collection(db, 'appointments'),
          where('date', '>', Timestamp.fromDate(currentDate)),
          where('status', 'in', ['scheduled', 'confirmed']),
          orderBy('date', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const appts: Appointment[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            patient: data.patient || "",
            doctor: data.doctor || "",
            checkup: data.checkup || "",
            date: data.date instanceof Timestamp ? data.date : Timestamp.fromDate(new Date(data.date || Date.now())),
            time: data.time || "",
            status: data.status || "scheduled",
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt : undefined,
          };
        });
        setUpcomingAppointments(appts);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast({ description: 'Failed to load appointments.', variant: 'destructive' });
      }
    };

    fetchAppointments();
  }, [currentDate, toast]);

  // Fetch and aggregate medication trends from doctor_notes
  useEffect(() => {
    const fetchMedicationTrends = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doctor_notes'));
        const notes: DoctorNote[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as DoctorNote[];

        const medCounts = new Map<string, number>();
        notes.forEach(note => {
          if (note.medication) {
            const meds = note.medication.split(',').map(m => m.trim().split(' - ')[0].trim());
            meds.forEach(med => {
              if (med) medCounts.set(med, (medCounts.get(med) || 0) + 1);
            });
          }
        });

        const trends = Array.from(medCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);
        setMedicationTrends(trends.map(([med, count]) => ({ med, count })));
      } catch (error) {
        console.error('Error fetching medication trends:', error);
        toast({ description: 'Failed to load medication trends.', variant: 'destructive' });
      }
    };

    fetchMedicationTrends();
  }, [toast]);

  // Fetch procurement data
  useEffect(() => {
    const fetchProcurement = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'procurements'));
        const items: ProcurementItem[] = querySnapshot.docs.map(doc => ({
          medication: doc.data().medication,
          quantity: doc.data().quantity,
          lastUpdated: doc.data().lastUpdated as Timestamp,
        })) as ProcurementItem[];
        setProcurementData(items);
      } catch (error) {
        console.error('Error fetching procurement data:', error);
        toast({ description: 'Failed to load procurement data.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProcurement();
  }, [toast]);

  // AI Analysis for Insights
  const generateInsights = async () => {
    if (medicationTrends.length === 0 && procurementData.length === 0) {
      toast({ description: 'No data available for analysis.', variant: 'default' });
      return;
    }

    setIsAnalyzing(true);
    const trendsSummary = medicationTrends.map(t => `${t.med}: ${t.count} prescriptions`).join('; ');
    const stockSummary = procurementData.map(p => `${p.medication}: ${p.quantity}`).join('; ');

    try {
      const response = await fetch('https://riviamedsystem.vercel.app/api/hospital-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          upcomingApptsCount: upcomingAppointments.length,
          medicationTrends: trendsSummary,
          procurementStock: stockSummary,
          analysisDate: currentDate.toISOString(),
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setInsights(data.insights || []);

      if (data.insights && data.insights.length > 0) {
        toast({ description: 'Insights generated successfully.', variant: 'default' });
      } else {
        toast({ description: 'No insights generated.', variant: 'default' });
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      toast({ description: 'Failed to generate insights.', variant: 'destructive' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Low stock threshold
  const lowStockThreshold = 10;
  const lowStockMeds = procurementData.filter(item => item.quantity < lowStockThreshold);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">RiviaAI Hospital Analytics</h1>
        <Button 
        className='bg-green-1'
        onClick={generateInsights} disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : 'Generate AI Insights'}
        </Button>
      </div>

      {/* Upcoming Appointments */}
     <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments ({upcomingAppointments.length})</CardTitle>
          <CardDescription>Next 30 days starting from {currentDate.toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <p className="text-muted-foreground">No upcoming appointments.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Check-Up</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAppointments.slice(0, 10).map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell className="capitalize">{appt.patient}</TableCell>
                    <TableCell className="capitalize">{appt.doctor}</TableCell>
                    <TableCell className="capitalize">{appt.checkup}</TableCell>
                    <TableCell>{appt.date.toDate().toLocaleDateString()}</TableCell>
                    <TableCell>{appt.time}</TableCell>
                    <TableCell>
                      <Badge variant={appt.status === 'confirmed' ? 'default' : 'secondary'}>
                        {appt.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Medication Trends & Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Medication Trends</CardTitle>
            <CardDescription>Most prescribed medications (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {medicationTrends.slice(0, 5).map((trend, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{trend.med}</span>
                  <Badge className='bg-green-1'>{trend.count} prescriptions</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Generated from patient and medication data</CardDescription>
          </CardHeader>
          <CardContent>
            {insights.length === 0 ? (
              <p className="text-muted-foreground">Click &quot;Generate AI Insights&quot; to get started.</p>
            ) : (
              <div className="space-y-3">
                {insights.map((insight, idx) => (
                  <Alert key={idx} variant={insight.type === 'warning' ? 'destructive' : 'default'}>
                    <AlertDescription>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p>{insight.description}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Medication Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Medication Availability</CardTitle>
          <CardDescription>Current stock levels from procurement</CardDescription>
        </CardHeader>
        <CardContent>
          {lowStockMeds.length > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                <strong>Low Stock Alert:</strong> {lowStockMeds.length} medications below threshold.
              </AlertDescription>
            </Alert>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procurementData.map((item, idx) => {
                const isLow = item.quantity < lowStockThreshold;
                return (
                  <TableRow key={idx}>
                    <TableCell>{item.medication}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.lastUpdated.toDate().toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={isLow ? 'destructive' : 'default'}>
                        {isLow ? 'Low Stock' : 'Available'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiviaAI;