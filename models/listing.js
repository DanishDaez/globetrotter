const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = Schema({
    title: {type: String,
        required: true,
        unique: true // Add unique index to prevent duplicates
    },
    description: String,

    image:{
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],

    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    geometry:  {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: false
            },
            coordinates: {
              type: [Number],
              required: false
            }
          },
          
    category:{
        type: String,
        enum:["Trending","Rooms","Iconic Cities","Mountains","Castles","Amazing Pools","Camping","Farms","Arctic","Dome", "Boats"]
    }
})  

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in: listing.reviews}})

    }
})

const Listing = mongoose.model("Listing", listingSchema, "listings")
module.exports = Listing