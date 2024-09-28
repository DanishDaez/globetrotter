const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync")
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const { populate } = require("../models/review.js");
const listingControllers = require("../controllers/listings.js")
const multer  = require('multer')
const { storage } = require("../cloudConfig");
const upload = multer({ storage })

//Create and Index routes
router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync(listingControllers.createListing))

 //New Route
 router.get("/new", isLoggedIn, listingControllers.renderNewForm)
 

//Show Update Delete
router.route("/:id")
.get(wrapAsync(listingControllers.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingControllers.destroyListing))


 //Edit route
 router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingControllers.renderEditForm))
 

 module.exports =  router