import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize dotenv
dotenvConfig();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyCPI8Sp2FWZZAbjPsexjhNLl-KHCxVlNfo');

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