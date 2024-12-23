import { Router } from "express";
import { 
    create, 
    getAllRecipes, 
    getOneRecipe, 
    updateOneRecipe, 
    deleteOneRecipe 
} from "../controllers/recipes.controller.js";
import authenticateToken from "../middlewares/authMiddleware.js"; // Import your middleware

const router = Router();

// Routes to handle creation and fetching of all recipes
router.route("/recipes")
    .post(authenticateToken, create)  // Protect creation with authentication
    .get(getAllRecipes);             // Fetching all recipes is public

// Routes to handle specific recipes by ID
router.route("/recipes/:id")
    .get(getOneRecipe)               // Fetch a single recipe is public
    .put(authenticateToken, updateOneRecipe) // Protect updating a recipe
    .delete(authenticateToken, deleteOneRecipe); // Protect deletion of a recipe

export default router;
