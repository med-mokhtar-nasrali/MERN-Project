import mongoose from "mongoose";
import Recipes from "../models/recipes.model.js";

// Create a new recipe
async function create(req, res) {
    try {
        const {
            recipeName,
            recipeDescription,
            recipeDuration,
            recipeImg,
            recipeDirections,
            recipeCategory,
            recipeType,
            recipeIngredients
        } = req.body;

        // Ensure the user ID is extracted from the token
        if (!req.user || !req.user.id) {
            return res.status(403).json({ message: "Unauthorized action." });
        }

        // Create the recipe
        const newRecipe = new Recipes({
            recipeName,
            recipeDescription,
            recipeDuration,
            recipeImg,
            recipeDirections,
            recipeCategory,
            recipeType,
            recipeIngredients,
            postedBy: req.user.id // Associate with logged-in user
        });

        // Save the recipe
        const savedRecipe = await newRecipe.save();

        res.status(201).json({
            message: "Recipe created successfully!",
            recipe: savedRecipe
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while creating the recipe." });
    }
}

// Show all recipes
async function getAllRecipes(req, res) {
    try {
        const allRecipes = await Recipes.find().populate("postedBy", "firstName lastName");
        res.json(allRecipes);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

// Get one recipe by ID
async function getOneRecipe(req, res) {
    try {
        const foundRecipe = await Recipes.findById(req.params.id).populate("postedBy", "username email");
        res.json(foundRecipe);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

// Update one recipe by ID
async function updateOneRecipe(req, res) {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            req.body,
            options
        );
        res.json(updatedRecipe);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

// Function to delete a recipe
const deleteOneRecipe = async (req, res) => {
    try {
        const { id } = req.params; // ID of the recipe to delete
        const userId = req.user?._id; // User making the request

        console.log('Received delete request for recipe ID:', id);
        console.log('Request made by user ID:', userId);

        // Validate recipe ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error('Invalid recipe ID:', id);
            return res.status(400).json({ message: "Invalid recipe ID." });
        }

        // Check if the recipe exists and if the user is the creator
        const recipe = await Recipes.findById(id);
        if (!recipe) {
            console.error('Recipe not found with ID:', id);
            return res.status(404).json({ message: "Recipe not found." });
        }

        if (!recipe.createdBy) {
            console.error('Recipe createdBy field is undefined');
            return res.status(500).json({ message: "Recipe creator not defined." });
        }

        if (!userId) {
            console.error('User ID is undefined');
            return res.status(500).json({ message: "User ID not defined." });
        }

        if (recipe.createdBy.toString() !== userId.toString()) {
            console.error('User ID mismatch. Recipe created by:', recipe.createdBy, 'Request made by:', userId);
            return res.status(403).json({ message: "You are not authorized to delete this recipe." });
        }

        // Delete the recipe
        await recipe.remove();
        console.log('Recipe deleted successfully:', id);

        res.status(200).json({
            message: "Recipe deleted successfully!",
        });
    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({
            message: "An error occurred while deleting the recipe.",
            error: error.message,
        });
    }
};

// Function to get all recipes
export const getAllRecipesAdmin = async (req, res) => {
    try {
        const recipes = await Recipes.find();
        if (!recipes) return res.status(404).json({ error: 'No recipes found' });

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipes', details: err.message });
    }
};

// Function to delete a recipe (admin only)
export const deleteRecipeAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the recipe exists
        const recipe = await Recipes.findById(id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found.' });

        await recipe.deleteOne({ _id: id });
        res.status(200).json({ message: 'Recipe deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete recipe', details: err.message });
    }
};




export {
    create,
    getAllRecipes,
    getOneRecipe,
    updateOneRecipe,
    deleteOneRecipe
};
