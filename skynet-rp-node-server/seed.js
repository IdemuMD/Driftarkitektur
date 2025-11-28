const mongoose = require('mongoose');
const Puppy = require('./models/Puppy');

mongoose.connect('mongodb://localhost:27017/rainbow-puppies', { useNewUrlParser: true, useUnifiedTopology: true });

const puppies = [
  { name: 'Rainbow', puppyPower: 'Color Blast', bestFriend: 'Sunny', birthYear: 2020, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy1.png' },
  { name: 'Sparkle', puppyPower: 'Shine Bright', bestFriend: 'Luna', birthYear: 2021, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy2.png' },
  { name: 'Twinkle', puppyPower: 'Star Power', bestFriend: 'Max', birthYear: 2019, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy3.png' },
  { name: 'Glimmer', puppyPower: 'Glow Up', bestFriend: 'Bella', birthYear: 2022, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy4.png' },
  { name: 'Dazzle', puppyPower: 'Flash Dance', bestFriend: 'Charlie', birthYear: 2020, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy5.png' },
  { name: 'Shimmer', puppyPower: 'Wave Ride', bestFriend: 'Daisy', birthYear: 2021, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy6.png' },
  { name: 'Luster', puppyPower: 'Crystal Clear', bestFriend: 'Buddy', birthYear: 2019, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy7.png' },
  { name: 'Radiant', puppyPower: 'Beam Me Up', bestFriend: 'Molly', birthYear: 2022, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy8.png' },
  { name: 'Vivid', puppyPower: 'Hue Shift', bestFriend: 'Rocky', birthYear: 2020, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy9.png' },
  { name: 'Brilliant', puppyPower: 'Light Show', bestFriend: 'Sadie', birthYear: 2021, imageLink: 'http://skynet-rp-image-server/img/puppy/puppy10.png' }
];

Puppy.insertMany(puppies)
  .then(() => {
    console.log('Puppies seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding puppies:', err);
    mongoose.connection.close();
  });
