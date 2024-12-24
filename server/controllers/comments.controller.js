import Comments from "../models/comments.model.js";
import Recipes from "../models/recipes.model.js";
import mongoose from "mongoose";

// Function to add a comment to a recipe
export const addCommentToRecipe = async (req, res) => {
    try {
        const { id } = req.params; // ID of the recipe to comment on
        const { commentMessage , commentedBy} = req.body; // The comment message
        // const userId = req.user?._id; // Assuming user ID is extracted from authentication middleware

        // Validate recipe ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid recipe ID." });
        }

        // Check if the recipe exists
        const recipe = await Recipes.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }

        // Create a new comment
        const newComment = await Comments.create({
            commentMessage,
            commentedBy,
            commentedOn: id,
        });

        // Respond with success message
        res.status(201).json({
            message: "Comment added successfully!",
            comment: newComment,
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({
            message: "An error occurred while adding the comment.",
            error: error.message,
        });
    }
};

// Function to get comments for a recipe
export const getCommentsForRecipe = async (req, res) => {
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

        // Fetch comments for the recipe
        const comments = await Comments.find({ commentedOn: id }).populate(
            "commentedBy",
            "username email" // Assuming User model has these fields
        );

        res.status(200).json({
            message: "Comments fetched successfully!",
            comments,
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({
            message: "An error occurred while fetching the comments.",
            error: error.message,
        });
    }
};
