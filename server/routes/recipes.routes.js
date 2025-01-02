import { Router } from "express";
import {
    create,
    getAllRecipes,
    getOneRecipe,
    updateOneRecipe,
    deleteOneRecipe,
    deleteRecipeAdmin,
    getRecipesByUserId,
    searchRecipes
} from "../controllers/recipes.controller.js";
import { addCommentToRecipe, getCommentsForRecipe } from "../controllers/comments.controller.js"
import { addRatingToRecipe, getRatingsForRecipe } from "../controllers/rating.controller.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = Router();

// Routes to handle creation and fetching of all recipes
router.route("/recipes")
    .post(authenticateToken, create)
    .get(authenticateToken, getAllRecipes);

// Admin check middleware
const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

// Route to get all recipes (admin only)
router.get('/recipes/admin', authenticateToken, checkAdmin, getAllRecipes);


// Routes to handle specific recipes by ID
router.route("/recipes/:id")
    .get(getOneRecipe)
    .put(authenticateToken, updateOneRecipe)
    .delete(authenticateToken, deleteOneRecipe);

// Routes for handling comments on a recipe
router.route("/recipes/:id/comments")
    .post(authenticateToken, addCommentToRecipe)
    .get(getCommentsForRecipe);

// Route to add a rating to a recipe
router.route("/recipes/:id/ratings")
    .post(authenticateToken, addRatingToRecipe)
    .get(getRatingsForRecipe);

// Route to get recipes by user ID
router.get('/recipes/user/:userId', authenticateToken, getRecipesByUserId);

// Route to delete a recipe (admin only)
router.delete('/recipes/:id/admin', authenticateToken, checkAdmin, deleteRecipeAdmin);

// Route to search recipes
router.get('/recipes/search', authenticateToken, searchRecipes);


export default router;

