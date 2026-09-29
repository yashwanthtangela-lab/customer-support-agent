import express from 'express';
import { customers, tickets } from '../data/mockData.js';

const router = express.Router();

// GET /api/customers - list customers with search
router.get('/', (req, res) => {
  const { search } = req.query;
  let result = [...customers];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q)
    );
  }

  res.json(result);
});

// GET /api/customers/:id
router.get('/:id', (req, res) => {
  const customer = customers.find(c => c.id.toLowerCase() === req.params.id.toLowerCase());
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  // Attach customer tickets
  const customerTickets = tickets.filter(t => t.customerId.toLowerCase() === customer.id.toLowerCase());

  res.json({
    ...customer,
    tickets: customerTickets
  });
});

export default router;
