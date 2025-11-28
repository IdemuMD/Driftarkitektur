const express = require('express');
const mongoose = require('mongoose');
const Puppy = require('./models/Puppy');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/rainbow-puppies', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Rainbow Puppies App</h1>');
});

app.get('/login', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await user.comparePassword(password)) {
    req.session.userId = user._id;
    res.redirect('/admin');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/admin', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const puppies = await Puppy.find();
  let html = '<h1>Admin Panel - Puppies</h1><a href="/puppies/new">Add New Puppy</a><ul>';
  puppies.forEach(puppy => {
    html += `<li>${puppy.name} - <a href="/puppies/${puppy._id}/edit">Edit</a> <form method="POST" action="/puppies/${puppy._id}?_method=DELETE" style="display:inline;"><button type="submit">Delete</button></form></li>`;
  });
  html += '</ul>';
  res.send(html);
});

// Create
app.get('/puppies/new', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.send(`
    <form method="POST" action="/puppies">
      <input name="name" placeholder="Name" required />
      <input name="puppyPower" placeholder="Puppy Power" required />
      <input name="bestFriend" placeholder="Best Friend" required />
      <input name="birthYear" type="number" placeholder="Birth Year" required />
      <input name="imageLink" placeholder="Image Link" required />
      <button type="submit">Create</button>
    </form>
  `);
});

app.post('/puppies', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  await Puppy.create(req.body);
  res.redirect('/admin');
});

// Update
app.get('/puppies/:id/edit', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const puppy = await Puppy.findById(req.params.id);
  res.send(`
    <form method="POST" action="/puppies/${puppy._id}?_method=PUT">
      <input name="name" value="${puppy.name}" required />
      <input name="puppyPower" value="${puppy.puppyPower}" required />
      <input name="bestFriend" value="${puppy.bestFriend}" required />
      <input name="birthYear" value="${puppy.birthYear}" type="number" required />
      <input name="imageLink" value="${puppy.imageLink}" required />
      <button type="submit">Update</button>
    </form>
  `);
});

app.put('/puppies/:id', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  await Puppy.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin');
});

// Delete
app.delete('/puppies/:id', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  await Puppy.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

app.get('/puppy/:name', async (req, res) => {
  const puppy = await Puppy.findOne({ name: req.params.name });
  if (puppy) {
    res.send(`
      <h1>${puppy.name}</h1>
      <p>Puppy Power: ${puppy.puppyPower}</p>
      <p>Best Friend: ${puppy.bestFriend}</p>
      <p>Birth Year: ${puppy.birthYear}</p>
      <img src="${puppy.imageLink}" alt="${puppy.name}" />
    `);
  } else {
    res.status(404).send('Puppy not found');
  }
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
