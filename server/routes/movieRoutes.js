const express = require("express");
import { update } from "../../client/my-react-project/node_modules/tar/dist/esm/update";
import query from "../../client/my-react-project/node_modules/esquery/dist/esquery.esm";
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

router.get("/movies", async (req, res) => {
  try {
    const allMovie = await Movie.find();

    res.send({
      status: success,
      message: "Movie added successfully",
      data: allMovie,
    });
  } catch (err) {
    res.send({
      status: failed,
      message: err.message,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.body);
    res.send({
      status: success,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (err) {
    res.send({
      status: failed,
      message: err.message,
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
