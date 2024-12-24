import Rating from "../models/rating.model.js";
import Recipes from "../models/recipes.model.js";
import mongoose from "mongoose";

// Function to add a rating to a recipe
export const addRatingToRecipe = async (req, res) => {
    try {
        const { id } = req.params; // ID of the recipe to rate
        const { ratingValue, ratedBy } = req.body; // The rating value and the user who rated it

        // Validate recipe ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid recipe ID." });
        }

        // Check if the recipe exists
        const recipe = await Recipes.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }

        // Create a new rating
        const newRating = await Rating.create({
            ratingValue,
            ratedBy,
            ratedOn: id,
        });

        // Respond with success message
        res.status(201).json({
            message: "Rating added successfully!",
            rating: newRating,
        });
    } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).json({
            message: "An error occurred while adding the rating.",
            error: error.message,
        });
    }
};

// Function to get ratings for a recipe
export const getRatingsForRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate recipe ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid recipe ID." });
        }

        // Check if the recipe exists
        const recipe = await Recipes.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }

        // Fetch ratings for the recipe
        const ratings = await Rating.find({ ratedOn: id }).populate(
            "ratedBy",
            "username email" // Assuming User model has these fields
        );

        res.status(200).json({
            message: "Ratings fetched successfully!",
            ratings,
        });
    } catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).json({
            message: "An error occurred while fetching the ratings.",
            error: error.message,
        });
    }
};
