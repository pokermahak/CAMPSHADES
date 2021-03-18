const express = require("express");
const router=express.Router();
const catchAsync = require("../utils/catchAsync");
//const { campgroundSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const {isLoggedIn}=require('../middleware');
const {isAuthor}=require('../middleware');
const {validateCampground} = require("../middleware");
const multer=require('multer');
const {storage}=require('../cloudinary');
const upload=multer({storage});
const campgrounds=require('../controllers/campgrounds');



router.get("/", catchAsync(campgrounds.index));
router.get("/new", isLoggedIn, campgrounds.renderNewForm);
router.post(
  "/",
  isLoggedIn,upload.array('image'),
  validateCampground,
  catchAsync(campgrounds.createCampground)
);
router.get("/:id", catchAsync(campgrounds.showCampground));
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  upload.array("image"),
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);
router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);
module.exports=router;
