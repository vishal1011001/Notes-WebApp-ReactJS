import express from 'express';

const router = express.Router();

let notes = [
  {
    id: crypto.randomUUID(),
    title: "Morning Routine",
    note: "Remember to drink a full glass of water before having any coffee today."
  },
  {
    id: crypto.randomUUID(),
    title: "Grocery List",
    note: "Need to pick up almond milk, avocados, sourdough bread, and some fresh basil."
  },
  {
    id: crypto.randomUUID(),
    title: "Project Brainstorm",
    note: "The new UI should focus more on accessibility and high-contrast color schemes."
  },
  {
    id: crypto.randomUUID(),
    title: "Book Recommendation",
    note: "Check out 'The Midnight Library'—it was suggested by Sarah during lunch."
  },
  {
    id: crypto.randomUUID(),
    title: "Gym Schedule",
    note: "Leg day is moved to Thursday this week because of the late-night meeting."
  },
  {
    id: crypto.randomUUID(),
    title: "Weekend Trip",
    note: "Book the Airbnb for the hiking trip before the early bird discount expires."
  },
  {
    id: crypto.randomUUID(),
    title: "Code Refactor",
    note: "Replace all the legacy fetch calls with the new Axios instance for better error handling."
  },
  {
    id: crypto.randomUUID(),
    title: "Recipe Idea",
    note: "Try adding a pinch of cinnamon to the chili to see if it rounds out the heat."
  },
  {
    id: crypto.randomUUID(),
    title: "Meeting Notes",
    note: "The client wants the logo to be slightly larger but keep the minimalist vibe."
  },
  {
    id: crypto.randomUUID(),
    title: "Gift Ideas",
    note: "Mom mentioned she wanted a new gardening set for her birthday in June."
  },
  {
    id: crypto.randomUUID(),
    title: "Movie Watchlist",
    note: "Still need to finish the second season of that sci-fi show everyone is talking about."
  },
  {
    id: crypto.randomUUID(),
    title: "House Maintenance",
    note: "The kitchen faucet is dripping slightly; might need a new washer this weekend."
  },
  {
    id: crypto.randomUUID(),
    title: "Garden Plan",
    note: "Start the tomato seeds indoors by the end of the month to get a head start."
  },
  {
    id: crypto.randomUUID(),
    title: "Pet Care",
    note: "Check the local vet's schedule for the annual vaccination and flea treatment."
  },
  {
    id: crypto.randomUUID(),
    title: "Study Topic",
    note: "Deep dive into CSS Grid layouts and how they compare to Flexbox for complex pages."
  },
  {
    id: crypto.randomUUID(),
    title: "Personal Goals",
    note: "Aim to read at least twenty pages of a non-fiction book every single night."
  },
  {
    id: crypto.randomUUID(),
    title: "Inspiration",
    note: "The best time to plant a tree was 20 years ago. The second best time is now."
  },
  {
    id: crypto.randomUUID(),
    title: "Car Service",
    note: "Oil change is due in 500 miles. Call the shop to see if they have Saturday slots."
  },
  {
    id: crypto.randomUUID(),
    title: "Podcast Episode",
    note: "Listen to the interview with the lead designer from that major tech company."
  },
  {
    id: crypto.randomUUID(),
    title: "Cleaning Task",
    note: "Vacuum behind the sofa and dust the bookshelves in the living room."
  }
];

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.post('/notes', (req, res, next) => {
  console.log(req.body);
  const newNote = {
    id: crypto.randomUUID(),
    title: req.body.title,
    note: req.body.note
  };

  if (!newNote.title || !newNote.note) {
    throw new Error('Please include title and note both');
  } 

  notes.push(newNote);

  res.status(201).json(notes);
});

router.put('/notes/:id', (req, res, next) => {
  const id = (req.params.id);
  console.log(id);
  console.log(req.body);

  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.title = req.body.title;
  noteToEdit.note = req.body.note;

  res.status(200).json(notes);
});

router.delete('/notes/:id', (req, res, next) => {
  const id = (req.params.id);
  console.log("item deleted:", id);
  
  notes = notes.filter(note => note.id !== id);

  res.status(200).json(notes);
});

export default router;