const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validatelisting }=require("../middleware.js");
const listingcontroller = require ("../controllers/listings.js");
const multer = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});
router.route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(
     isLoggedIn,
     validatelisting,
     upload.single('listing[image.url]'),
     wrapAsync(listingcontroller.createListing)
   );
 // New route
router.get("/new", isLoggedIn,listingcontroller.renderNewForm);
  

  router.route("/:id")
  .get(
  
  wrapAsync(listingcontroller.showListing)
)
.put(
  
  isLoggedIn,
  isOwner,
  validatelisting,
  upload.single('listing[image.url]'),
  wrapAsync(listingcontroller.updateListing)
)
.delete(
  
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.destroyListing)
);

// Index route





// Show route


// Create route


// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.renderEditForm)
);

// Update route


// Delete route

module.exports = router;
