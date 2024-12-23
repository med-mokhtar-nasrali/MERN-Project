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
        const allRecipes = await Recipes.find().populate("postedBy", "username email");
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

// Delete one recipe by ID
async function deleteOneRecipe(req, res) {
    try {
        const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id);
        res.json(deletedRecipe);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

export {
    create,
    getAllRecipes,
    getOneRecipe,
    updateOneRecipe,
    deleteOneRecipe
};
