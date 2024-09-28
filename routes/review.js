const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError")
const Review = require("../models/review"); 
const Listing = require("../models/listing");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")


//Reveiws post
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.createReview))

//Revieew Delete
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports =  router