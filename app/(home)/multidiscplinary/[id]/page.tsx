"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SpecialistInput {
  specialistName: string;
  role: string;
  input: string;
}

const initialInputs: SpecialistInput[] = [
  {
    specialistName: 'Dr. James Kulei',
    role: 'Oncologist',
    input: 'The biopsy confirms non-small cell lung cancer (adenocarcinoma) with mediastinal lymph node involvement but no distant metastases...'
  },
  {
    specialistName: 'Dr. Sarah Mwangi',
    role: 'Pharmacist',
    input: 'The patient is on metformin, insulin, losartan, and amlodipine. Potential drug interactions and toxicity monitoring will be important...'
  },
  {
    specialistName: 'Dr. Emily Njoroge',
    role: 'Pathologist',
    input: 'Histology confirms adenocarcinoma of the lung, subtype of NSCLC. Tumor morphology is consistent with a moderately differentiated adenocarcinoma...'
  }
];

const MultidisciplinaryBoard: React.FC = () => {
  const [inputs, setInputs] = useState<SpecialistInput[]>(initialInputs);

  const [newInput, setNewInput] = useState<SpecialistInput>({
    specialistName: '',
    role: '',
    input: ''
  });

  const handleInputChange = (field: keyof SpecialistInput, value: string) => {
    setNewInput(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInput.specialistName && newInput.role && newInput.input) {
      setInputs(prev => [...prev, newInput]);
      setNewInput({ specialistName: '', role: '', input: '' });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Multidisciplinary Board - Case Review
        </h1>

        {/* Patient Case Summary */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-green-1">
              Patient Case: Mr. A.O
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              <strong>Patient Profile:</strong> 58-year-old male with hypertension (15 yrs) and type 2 diabetes (10 yrs). <br />
              <strong>Presenting Complaint:</strong> Progressive cough, weight loss, blood-stained sputum. <br />
              <strong>Past Medical History:</strong> Former smoker (20 pack-year). <br />
              <strong>Investigations:</strong> 
              <ul className="list-disc ml-6">
                <li>Chest X-ray: Right upper lobe opacity.</li>
                <li>CT scan: Mass with mediastinal lymphadenopathy.</li>
                <li>Bronchoscopy biopsy: NSCLC (adenocarcinoma).</li>
                <li>PET scan: No distant metastases.</li>
                <li>HbA1c: 9.2% (poorly controlled).</li>
              </ul>
              <strong>Social History:</strong> Sole breadwinner, concerned about costs.
            </p>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Specialist Inputs */}
        <ScrollArea className="h-[600px] w-full rounded-md border p-4 mb-6">
          <div className="space-y-6">
            {inputs.map((input, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{input.role} Input</span>
                    <Badge variant="secondary">{input.specialistName}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{input.input}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Add New Input Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-green-700">
              Add New Specialist Input
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="specialistName" className="block text-sm font-medium text-gray-700">
                  Specialist Name
                </label>
                <Input
                  id="specialistName"
                  value={newInput.specialistName}
                  onChange={(e) => handleInputChange('specialistName', e.target.value)}
                  placeholder="Enter specialist name"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <Select
                  value={newInput.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                  required
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oncologist">Oncologist</SelectItem>
                    <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="Pathologist">Pathologist</SelectItem>
                    <SelectItem value="Endocrinologist">Endocrinologist</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="input" className="block text-sm font-medium text-gray-700">
                  Input
                </label>
                <Textarea
                  id="input"
                  value={newInput.input}
                  onChange={(e) => handleInputChange('input', e.target.value)}
                  placeholder="Enter your input here"
                  className="mt-1"
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="bg-green-1 hover:bg-green-600">
                Submit Input
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultidisciplinaryBoard;
