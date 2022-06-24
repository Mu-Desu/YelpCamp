// ! this is a seed file to seed our database once and it will delete every thing and make new data its good for starting
const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection //?shortcut
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
})

//? to randomize the places and descriptors
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        //? to random the cities
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10)
        const camp = new Campground({
            author: '62a7bfa779bae2c4fe0d3c2c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque officiis rerum nam sed earum consequuntur quas illum, inventore, omnis minima ea porro ipsum odio magni eius. Ab distinctio commodi deleniti?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwyyjoxf6/image/upload/v1655419719/YelpCamp/cz5kx9fva8ft1yhh1eu2.jpg',
                    filename: 'YelpCamp/cz5kx9fva8ft1yhh1eu2'
                },
                {
                    url: 'https://res.cloudinary.com/dwyyjoxf6/image/upload/v1655419719/YelpCamp/pcnjclixa5sqjyoqkxtm.jpg',
                    filename: 'YelpCamp/pcnjclixa5sqjyoqkxtm'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})