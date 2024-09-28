const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log("Error connecting to DB:", err);
});

async function main() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

const initDB = async () => {
    try {
      // Insert listings from initData, handling existing listings
      for (const listing of initData.data) {
        listing.owner = "66ef08a52573e2c4bf7f1de7";
        const existingListing = await Listing.findOne({ title: listing.title });
        if (!existingListing) {
          const newListing = new Listing(listing);
          await newListing.save();
          console.log(`Inserted new listing: ${listing.title}`);
        } else {
          console.log(`Listing already exists: ${listing.title}`);
        }
      }
  
      // Verify that all data has been inserted correctly
      const listings = await Listing.find({});
      console.log(`Found ${listings.length} listings in the database.`);
      listings.forEach(listing => {
        console.log(`Title: ${listing.title}, Location: ${listing.location}`);
      });
    } catch (error) {
      console.error("Error during data insertion:", error);
    }
  };
  
  initDB();