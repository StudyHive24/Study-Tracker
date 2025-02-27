import express from 'express';
const router = express.Router();

// Mock database (in-memory array)
let timetableEntries = [];

// Helper function to find an entry by ID
const findEntryById = (id) => timetableEntries.find((entry) => entry.id === id);

// POST /api/timetable/create - Create a new timetable entry
router.post('/create', (req, res) => {
  const { day, startTime, endTime, title, color } = req.body;

  // Validate required fields
  if (!day || !startTime || !endTime || !title || !color) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create a new entry
  const newEntry = {
    id: timetableEntries.length + 1, // Generate a unique ID
    day,
    startTime,
    endTime,
    title,
    color,
  };

  // Add to the database (in this case, an array)
  timetableEntries.push(newEntry);

  // Return the new entry
  res.status(201).json(newEntry);
});

// GET /api/timetable - Fetch all timetable entries
router.get('/', (req, res) => {
  res.status(200).json(timetableEntries);
});

// GET /api/timetable/:id - Fetch a specific timetable entry by ID
router.get('/:id', (req, res) => {
  const entryId = parseInt(req.params.id);
  const entry = findEntryById(entryId);

  if (!entry) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  res.status(200).json(entry);
});

// PUT /api/timetable/:id - Update a specific timetable entry by ID
router.put('/:id', (req, res) => {
  const entryId = parseInt(req.params.id);
  const { day, startTime, endTime, title, color } = req.body;

  // Find the entry to update
  const entryToUpdate = findEntryById(entryId);

  if (!entryToUpdate) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  // Validate required fields
  if (!day || !startTime || !endTime || !title || !color) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Update the entry
  entryToUpdate.day = day;
  entryToUpdate.startTime = startTime;
  entryToUpdate.endTime = endTime;
  entryToUpdate.title = title;
  entryToUpdate.color = color;

  // Return the updated entry
  res.status(200).json(entryToUpdate);
});

// DELETE /api/timetable/:id - Delete a specific timetable entry by ID
router.delete('/:id', (req, res) => {
  const entryId = parseInt(req.params.id);

  // Find the index of the entry to delete
  const entryIndex = timetableEntries.findIndex((entry) => entry.id === entryId);

  if (entryIndex === -1) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  // Remove the entry from the array
  timetableEntries.splice(entryIndex, 1);

  // Return a success message
  res.status(200).json({ message: 'Entry deleted successfully' });
});

export default router;