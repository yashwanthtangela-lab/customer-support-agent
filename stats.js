import express from 'express';
import { tickets, customers, activeChat } from '../data/mockData.js';

const router = express.Router();

router.get('/', (req, res) => {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
  const escalatedTickets = tickets.filter(t => t.status === 'Escalated').length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;

  const recentConversations = [
    {
      id: "conv-1",
      ticketId: "TCK-2041",
      customerId: "CUST-1001",
      customerName: "Alex Rivera",
      company: "ApexCloud Corp",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      lastMessage: "Yes, exactly. We recently rotated the X.509 signing certificate in Okta...",
      timestamp: "12m ago",
      status: "Escalated",
      priority: "Urgent",
      unread: false,
      channel: "Web Portal"
    },
    {
      id: "conv-2",
      ticketId: "TCK-2042",
      customerId: "CUST-1002",
      customerName: "Sophia Zhang",
      company: "DataStride Analytics",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      lastMessage: "Webhook endpoint returning 429 Too Many Requests spike on production stream.",
      timestamp: "2h ago",
      status: "Open",
      priority: "High",
      unread: true,
      channel: "API Ingest"
    },
    {
      id: "conv-3",
      ticketId: "TCK-2043",
      customerId: "CUST-1003",
      customerName: "Marcus Vance",
      company: "Nordic Fintech Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      lastMessage: "Can you confirm our registered VAT exemption number for this cycle?",
      timestamp: "1d ago",
      status: "In Progress",
      priority: "Medium",
      unread: false,
      channel: "Email"
    },
    {
      id: "conv-4",
      ticketId: "TCK-2044",
      customerId: "CUST-1005",
      customerName: "Dev Patel",
      company: "HyperStack Studios",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      lastMessage: "SSL certificate renewal stuck at ACME DNS challenge step.",
      timestamp: "5d ago",
      status: "Open",
      priority: "High",
      unread: false,
      channel: "Web Portal"
    }
  ];

  res.json({
    metrics: {
      totalTickets,
      openTickets,
      resolvedTickets,
      escalatedTickets,
      inProgressTickets,
      avgResolutionTime: "2.4 hours",
      satisfactionRate: "98.4%",
      firstResponseTime: "4m 12s",
      hindsightMemoryHealth: "Integration Standby"
    },
    recentConversations
  });
});

export default router;
