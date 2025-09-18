import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize dotenv
dotenvConfig();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

// Medication analysis endpoint
app.post('/api/analyze-medications', async (req, res) => {
  try {
    const { medications } = req.body;

    if (!medications || !Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ error: 'Medications must be a non-empty array' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

   const prompt = `
You are a hospital safety AI. 
Here is your knowledge base for look-alike/sound-alike (LASA) and high-alert drugs in Kenya:

LASA Examples:
- Ceftriaxone vs. Cefotaxime vs. Cefuroxime
- Augmentin (amoxicillin + clavulanate) vs. Ampiclox (ampicillin + cloxacillin)
- Erythromycin vs. Azithromycin vs. Clarithromycin
- Metronidazole vs. Metformin
- Gentamicin vs. Vancomycin

Look-Alike Examples:
- Amoxil vs. Ampiclox (both red/yellow capsules)
- Augmentin vs. Cotrimoxazole (white scored tablets in silver strips)
- Ceftriaxone vs. Cefotaxime (white powder vials)
- Azithromycin vs. Erythromycin (white film-coated tablets)

High-Alert Drugs:
- Insulins (Actrapid, Mixtard, Insulatard, Humalog, Humulin)
- Heparin, Enoxaparin (Clexane), Warfarin
- Potassium chloride injection, Sodium chloride ≥3%, Magnesium sulfate injection

Now analyze these medications: ${medications.join(', ')}.
Respond ONLY in JSON with { "flags": [ ... ] } format.`;


    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // 🧹 Clean markdown fences if Gemini still adds them
    responseText = responseText.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (err) {
    console.error('Error analyzing medications:', err);
      console.error("Failed to parse AI JSON:", responseText);
      return res.status(500).json({ error: 'Invalid JSON returned from AI', raw: responseText });
    }

    res.json(parsed);

  } catch (err) {
    console.error('Error analyzing medications:', err);
    res.status(500).json({ error: 'Failed to analyze medications', details: err.message });
  }
});



// Hospital analytics endpoint
app.post('/api/hospital-analytics', async (req, res) => {
  try {
    const { upcomingApptsCount, medicationTrends, procurementStock, analysisDate } = req.body;

    // ✅ Input validation
    if (
      upcomingApptsCount === undefined ||
      !medicationTrends ||
      !procurementStock ||
      !analysisDate
    ) {
      return res.status(400).json({
        error: 'Missing required fields: upcomingApptsCount, medicationTrends, procurementStock, analysisDate',
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
You are a hospital data analyst AI. 
Analyze hospital analytics as of ${analysisDate}:

- Upcoming appointments: ${upcomingApptsCount}
- Medication trends: ${medicationTrends}
- Procurement stock: ${procurementStock}

Provide **3–5 concise insights** covering:
- Trends (e.g., increasing demand, seasonal patterns)
- Warnings (e.g., potential shortages, high patient load)
- Recommendations (e.g., resupply, staffing, efficiency)

Respond ONLY in JSON, format:
{
  "insights": [
    { "title": "...", "description": "...", "type": "trend|warning|recommendation" }
  ]
}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // 🧹 Clean markdown fences if Gemini still adds them
    responseText = responseText.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (err) {
      console.error('Error parsing AI JSON:', err);
      console.error('Raw response:', responseText);
      return res.status(500).json({
        error: 'Invalid JSON returned from AI',
        raw: responseText,
      });
    }

    res.json(parsed);
  } catch (err) {
    console.error('Error analyzing hospital analytics:', err);
    res.status(500).json({
      error: 'Failed to analyze hospital analytics',
      details: err.message,
    });
  }
});


// AI recommendation endpoint
app.post('/api/ai-recommendation', async (req, res) => {
  const maxRetries = 3;
  let retryCount = 0;
  let lastError;

  while (retryCount < maxRetries) {
    try {
      const { symptoms, diagnosis, patientHistory, vitals } = req.body;

      // Validate input
      if (!symptoms || symptoms.trim().length === 0) {
        return res.status(400).json({ error: 'Symptoms are required' });
      }

      console.log('Generating AI recommendation for symptoms:', symptoms, 'Vitals:', vitals);

      // Get the Gemini model
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Craft medical prompt with explicit medication format
      const prompt = `You are a medical AI assistant helping healthcare professionals. Based on the patient information provided, generate professional medical recommendations.

**Patient Information:**
- Symptoms: ${symptoms}
- Current Diagnosis: ${diagnosis || 'Not yet determined'}
- Patient History: ${patientHistory || 'Not provided'}
- Vital Signs:
  - Weight: ${vitals?.weight || 'Not provided'} Kg
  - Height: ${vitals?.height || 'Not provided'} cm
  - Temperature: ${vitals?.temperature || 'Not provided'} °C
  - Blood Pressure: ${vitals?.bloodPressure || 'Not provided'}
  - Heart Rate: ${vitals?.heartRate || 'Not provided'} BPM
  - Respiratory Rate: ${vitals?.respiratoryRate || 'Not provided'} breaths/min

**Please provide a structured response in Markdown with the following sections:**
1. **Diagnostic Considerations**: Possible conditions based on symptoms and vitals
2. **Recommended Tests**: Specific laboratory tests, imaging, or examinations
3. **Treatment Suggestions**: 
   - List specific medications with name, dosage, frequency, and duration (e.g., "Ibuprofen 400mg, oral, every 6 hours for 3 days").
   - Use a bullet list for medications (e.g., "- Ibuprofen 400mg, oral, every 6 hours for 3 days").
   - Include contraindications and side effects for each medication.
   - Suggest first-line and alternative treatments.
4. **Monitoring**: What to watch for and follow-up recommendations
5. **Red Flags**: Warning signs requiring immediate attention

**Important Guidelines:**
- Be specific with medication names, standard dosages, administration routes, frequency, and duration.
- Ensure recommendations are evidence-based and professional.
- Format medications in a bullet list under "Treatment Suggestions" for easy parsing.
- Consider vital signs (e.g., abnormal blood pressure or heart rate) in recommendations.
- Always include a medical disclaimer.

**Medical Disclaimer**: These are AI-generated suggestions. Final medical decisions must be made by qualified healthcare professionals after proper patient examination.

Please provide your recommendations in Markdown format:`;

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('AI recommendation generated successfully');

      res.json({
        success: true,
        recommendation: text,
        timestamp: new Date().toISOString(),
        disclaimer: '⚠️ AI-generated medical suggestions. Always consult qualified healthcare professionals for final medical decisions.'
      });
      return; // Success, exit loop

    } catch (error) {
      lastError = error;
      console.error(`Gemini API Error (attempt ${retryCount + 1}):`, error.message);

      if (error.status === 429) {
        const retryDelay = error.errorDetails?.find(d => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo')?.retryDelay || '5s';
        const delayMs = parseInt(retryDelay) * 1000;
        console.log(`Quota exceeded. Retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        retryCount++;
      } else {
        break; // Non-retryable error
      }
    }
  }

  console.error('All retries failed:', lastError);
  res.status(lastError.status === 429 ? 429 : 500).json({
    error: lastError.status === 429 ? 'API quota exceeded. Please try again later.' : 'Failed to generate AI recommendation.',
    details: process.env.NODE_ENV === 'development' ? lastError.message : undefined
  });
});


// Error handling middleware
app.use((err, req, res) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler (must be after all other routes/middleware)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🧠 AI endpoint: http://localhost:${PORT}/api/ai-recommendation`);
});

export default app;