const express = require("express");
const router = express.Router();

const Movie = require("../models/MovieModel");

router.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({ success: true, message: "New Movie has been added" });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

router.get("/get-all-movies", async (req, res) => {
  try {
    const allMovies = await Movie.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      message: "Movies retrieved successfully",
      data: allMovies
    });
  } catch (err) {
    console.error('Get movies error:', err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Update the movie with the new data
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      updateData,  // Pass the update data directly
      { new: true }  // Return the updated document
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    return res.json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie
    });
  } catch (err) {
    console.error('Update movie error:', err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post("/delete-movie", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    console.log(req.body.movieId);
    res.send({
      success: true,
      message: "The movie has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;

