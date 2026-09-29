import express from 'express';
import { tickets, customers } from '../data/mockData.js';

const router = express.Router();

// Local mutable copy for interactive testing
let currentTickets = [...tickets];

// GET /api/tickets - list tickets with optional filtering
router.get('/', (req, res) => {
  const { status, priority, search } = req.query;
  let filtered = [...currentTickets];

  if (status && status !== 'All') {
    filtered = filtered.filter(t => t.status.toLowerCase() === status.toLowerCase());
  }

  if (priority && priority !== 'All') {
    filtered = filtered.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(t => 
      t.id.toLowerCase().includes(q) ||
      t.issue.toLowerCase().includes(q) ||
      t.customer.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

// GET /api/tickets/:id
router.get('/:id', (req, res) => {
  const ticket = currentTickets.find(t => t.id.toLowerCase() === req.params.id.toLowerCase());
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }
  res.json(ticket);
});

// POST /api/tickets - create a new ticket
router.post('/', (req, res) => {
  const { customer, issue, priority = 'Medium', category = 'General', description = '' } = req.body;

  if (!customer || !issue) {
    return res.status(400).json({ error: 'Customer name and issue description are required' });
  }

  const newId = `TCK-${2050 + currentTickets.length}`;
  const now = new Date();
  const createdDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const matchingCustomer = customers.find(c => c.name.toLowerCase() === customer.toLowerCase());

  const newTicket = {
    id: newId,
    customer,
    customerId: matchingCustomer ? matchingCustomer.id : `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
    customerEmail: matchingCustomer ? matchingCustomer.email : `${customer.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    issue,
    priority,
    status: 'Open',
    createdDate,
    assignedTo: 'AI Assistant (MemoryDesk)',
    category,
    description
  };

  currentTickets.unshift(newTicket);
  res.status(201).json(newTicket);
});

// PATCH /api/tickets/:id/status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const index = currentTickets.findIndex(t => t.id.toLowerCase() === req.params.id.toLowerCase());

  if (index === -1) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  const validStatuses = ['Open', 'In Progress', 'Resolved', 'Escalated'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  currentTickets[index].status = status;
  res.json(currentTickets[index]);
});

export default router;
