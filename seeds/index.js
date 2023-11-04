const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")

main().catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log("MONGO CONNECTION OPEN!!!")
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "6505c6bee83eeebc4bcad309",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: "https://res.cloudinary.com/dftwoox3p/image/upload/v1696084845/YelpCamp/gao04w831qhoganev6b9.jpg",
                    filename: "YelpCamp/gao04w831qhoganev6b9"
                },
                {
                    url: "https://res.cloudinary.com/dftwoox3p/image/upload/v1696084846/YelpCamp/kb04ixkqkozxec9dipzn.jpg",
                    filename: "YelpCamp/kb04ixkqkozxec9dipzn"
                },
                {
                    url: "https://res.cloudinary.com/dftwoox3p/image/upload/v1696084847/YelpCamp/koo4bzr88teslm9gubal.jpg",
                    filename: "YelpCamp/koo4bzr88teslm9gubal"
                }
            ],
            description: "Beautiful campground for everyone. Dogs welcome.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})