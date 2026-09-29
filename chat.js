import express from 'express';
import { activeChat, hindsightMemoryDocumentation } from '../data/mockData.js';

const router = express.Router();

// Local in-memory session for active chat
let currentChat = {
  ...activeChat,
  messages: [...activeChat.messages]
};

// GET /api/chat/active - get active chat thread with customer & ticket info
router.get('/active', (req, res) => {
  // Memory used panel for future Hindsight results
  const memoryUsed = {
    provider: "Hindsight Memory Engine",
    status: "Standby – Ready for Hindsight Integration",
    integrationNotice: "This panel will dynamically stream memories retrieved by Hindsight once your HINDSIGHT_API_KEY is configured in .env.",
    activeContext: {
      customerId: currentChat.customer.id,
      customerName: currentChat.customer.name,
      sessionTicketId: currentChat.ticket.id
    },
    // Memories relevant to Alex Rivera and Okta SSO
    recalledMemories: hindsightMemoryDocumentation.sampleRetrievedMemories.filter(
      m => m.customerId === currentChat.customer.id
    )
  };

  res.json({
    chat: currentChat,
    memoryUsed
  });
});

// POST /api/chat/message - send message
router.post('/message', (req, res) => {
  const { text, sender = 'agent' } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Message text cannot be empty' });
  }

  const now = new Date();
  const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const userMsg = {
    id: `msg-${Date.now()}`,
    sender,
    name: sender === 'customer' ? currentChat.customer.name : 'MemoryDesk Support Agent',
    avatar: sender === 'customer' 
      ? currentChat.customer.avatar 
      : '/bot-avatar.svg',
    timestamp: timeString,
    text: text.trim()
  };

  currentChat.messages.push(userMsg);

  // If the sender was a customer or testing from agent, generate an intelligent acknowledgment
  // (clearly adhering to: "Do not integrate Groq or Hindsight yet. First create the working project foundation and UI.")
  let agentResponse = null;
  if (sender === 'customer') {
    agentResponse = {
      id: `msg-${Date.now() + 1}`,
      sender: 'agent',
      name: 'MemoryDesk Support Agent (Foundation Mode)',
      avatar: '/bot-avatar.svg',
      timestamp: timeString,
      text: "Acknowledged. Your message has been logged to ticket " + currentChat.ticket.id + ". (Note: Groq LLM inference and Hindsight semantic recall will be active once API keys are connected)."
    };
    currentChat.messages.push(agentResponse);
  }

  res.json({
    sentMessage: userMsg,
    agentResponse,
    messages: currentChat.messages
  });
});

// POST /api/chat/reset - reset chat demo
router.post('/reset', (req, res) => {
  currentChat = {
    ...activeChat,
    messages: [...activeChat.messages]
  };
  res.json({ success: true, chat: currentChat });
});

export default router;
