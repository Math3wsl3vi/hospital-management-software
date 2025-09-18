"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface CasePreview {
  id: string;
  initials: string;
  age: number;
  mainComplaint: string;
  keyDiagnosis: string;
}

const initialCases: CasePreview[] = [
  {
    id: '1',
    initials: 'Mr. A.O',
    age: 58,
    mainComplaint: 'Progressive cough, weight loss, blood-stained sputum',
    keyDiagnosis: 'Non-small cell lung cancer (adenocarcinoma)',
  },
  {
    id: '2',
    initials: 'Ms. J.K',
    age: 45,
    mainComplaint: 'Chest pain, palpitations, shortness of breath',
    keyDiagnosis: 'Suspected pulmonary embolism',
  },
  {
    id: '3',
    initials: 'Mr. P.M',
    age: 62,
    mainComplaint: 'Abdominal pain, jaundice, nausea',
    keyDiagnosis: 'Pancreatic adenocarcinoma',
  },
];

const CasesPreview: React.FC = () => {
  const [cases, setCases] = useState<CasePreview[]>(initialCases);

  const [newCase, setNewCase] = useState<Omit<CasePreview, 'id'>>({
    initials: '',
    age: 0,
    mainComplaint: '',
    keyDiagnosis: ''
  });

  const handleChange = (field: keyof Omit<CasePreview, 'id'>, value: string | number) => {
    setNewCase(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCase.initials && newCase.age && newCase.mainComplaint && newCase.keyDiagnosis) {
      setCases(prev => [
        ...prev,
        { ...newCase, id: (prev.length + 1).toString() } // generate simple id
      ]);
      setNewCase({ initials: '', age: 0, mainComplaint: '', keyDiagnosis: '' });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Multidisciplinary Board - Case Previews
        </h1>
        <Separator className="my-4" />

        {/* Case List */}
        <div className="flex flex-col gap-4 mb-6">
          {cases.map((caseItem) => (
            <Link key={caseItem.id} href={`/multidisciplinary/${caseItem.id}`}>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 rounded-lg w-full">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg font-semibold text-green-600">
                    {caseItem.initials}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2 space-y-1">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                    Age: {caseItem.age}
                  </span>
                  <p className="text-gray-700 text-sm">
                    <strong>Main Complaint:</strong> {caseItem.mainComplaint}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Key Diagnosis:</strong>{' '}
                    <span className="text-red-600 font-medium">{caseItem.keyDiagnosis}</span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Add New Case Form */}
        <Card className="shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Case</h2>
          <form onSubmit={handleAddCase} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Initials</label>
              <input
                type="text"
                value={newCase.initials}
                onChange={(e) => handleChange('initials', e.target.value)}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="e.g., Mr. X.Y"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                value={newCase.age || ''}
                onChange={(e) => handleChange('age', Number(e.target.value))}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Enter age"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Main Complaint</label>
              <textarea
                value={newCase.mainComplaint}
                onChange={(e) => handleChange('mainComplaint', e.target.value)}
                className="mt-1 w-full border rounded-md p-2"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Key Diagnosis</label>
              <textarea
                value={newCase.keyDiagnosis}
                onChange={(e) => handleChange('keyDiagnosis', e.target.value)}
                className="mt-1 w-full border rounded-md p-2"
                rows={2}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Add Case
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CasesPreview;
