
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const memoryFile = path.join(__dirname, '../data/memory.json');

function readMemories() {
  try {
    if (!fs.existsSync(memoryFile)) {
      fs.writeFileSync(memoryFile, '[]');
    }

    return JSON.parse(fs.readFileSync(memoryFile, 'utf8'));
  } catch (error) {
    console.error('Error reading memories:', error);
    return [];
  }
}

function saveMemories(memories) {
  fs.writeFileSync(
    memoryFile,
    JSON.stringify(memories, null, 2)
  );
}

// GET /api/memory/retrieved?customerId=...
router.get('/retrieved', (req, res) => {
  const { customerId } = req.query;

  let memories = readMemories();

  if (customerId) {
    memories = memories.filter(
      memory =>
        memory.customerId?.toLowerCase() === customerId.toLowerCase()
    );
  }

  res.json({
    total: memories.length,
    memories
  });
});

// POST /api/memory
router.post('/', (req, res) => {
  const { customerId, type, content } = req.body;

  if (!customerId || !content) {
    return res.status(400).json({
      error: 'customerId and content are required'
    });
  }

  const memories = readMemories();

  const newMemory = {
    id: `mem-${Date.now()}`,
    customerId,
    type: type || 'conversation',
    content,
    createdAt: new Date().toISOString()
  };

  memories.push(newMemory);
  saveMemories(memories);

  res.status(201).json({
    message: 'Memory saved successfully',
    memory: newMemory
  });
});

// DELETE /api/memory/:id
router.delete('/:id', (req, res) => {
  const memories = readMemories();

  const filtered = memories.filter(
    memory => memory.id !== req.params.id
  );

  if (filtered.length === memories.length) {
    return res.status(404).json({
      error: 'Memory not found'
    });
  }

  saveMemories(filtered);

  res.json({
    message: 'Memory deleted successfully'
  });
});

export default router;
