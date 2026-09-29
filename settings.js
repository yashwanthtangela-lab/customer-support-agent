import express from 'express';

const router = express.Router();

let settingsStore = {
  agentName: "MemoryDesk Support Assistant",
  organization: "CloudScale Technologies Inc.",
  supportEmail: "support@memorydesk.io",
  autoEscalateUrgent: true,
  enableSLAWarning: true,
  groqModel: "llama-3.3-70b-versatile",
  hindsightMemoryWindow: "30_days",
  theme: "slate-modern"
};

// GET /api/settings - get agent settings & safe env status
router.get('/', (req, res) => {
  const hasGroqKey = Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() !== '');
  const hasHindsightKey = Boolean(process.env.HINDSIGHT_API_KEY && process.env.HINDSIGHT_API_KEY.trim() !== '');

  res.json({
    settings: settingsStore,
    environmentStatus: {
      groqConfigured: hasGroqKey,
      groqStatus: hasGroqKey ? "Configured in server .env" : "Missing GROQ_API_KEY in server .env",
      hindsightConfigured: hasHindsightKey,
      hindsightStatus: hasHindsightKey ? "Configured in server .env" : "Missing HINDSIGHT_API_KEY in server .env",
      port: process.env.PORT || 5000,
      nodeEnv: process.env.NODE_ENV || 'development'
    },
    securityNotice: "API keys are strictly managed on the Node.js Express server via environment variables and are never sent to the browser bundle."
  });
});

// POST /api/settings - update settings
router.post('/', (req, res) => {
  const { agentName, organization, supportEmail, autoEscalateUrgent, enableSLAWarning, groqModel, hindsightMemoryWindow } = req.body;

  settingsStore = {
    ...settingsStore,
    ...(agentName && { agentName }),
    ...(organization && { organization }),
    ...(supportEmail && { supportEmail }),
    ...(typeof autoEscalateUrgent === 'boolean' && { autoEscalateUrgent }),
    ...(typeof enableSLAWarning === 'boolean' && { enableSLAWarning }),
    ...(groqModel && { groqModel }),
    ...(hindsightMemoryWindow && { hindsightMemoryWindow })
  };

  res.json({ success: true, settings: settingsStore });
});

export default router;
