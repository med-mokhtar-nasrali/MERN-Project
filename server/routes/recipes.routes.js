import { Router } from "express";
import { 
    create, 
    getAllRecipes, 
    getOneRecipe, 
    updateOneRecipe, 
    deleteOneRecipe,
} from "../controllers/recipes.controller.js";
import {    addCommentToRecipe,getCommentsForRecipe} from "../controllers/comments.controller.js"
import { addRatingToRecipe, getRatingsForRecipe } from "../controllers/rating.controller.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = Router();

// Routes to handle creation and fetching of all recipes
router.route("/recipes")
    .post(authenticateToken, create)
    .get(getAllRecipes);

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
    .post(authenticateToken,addRatingToRecipe)
    .get(getRatingsForRecipe);
    

export default router;