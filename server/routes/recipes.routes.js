import  {
	create, getAllRecipes, getOneRecipe, updateOneRecipe, deleteOneRecipe} from "../controllers/recipes.controller.js"

import { Router } from "express";
const router = Router();

router.route("/recipes").post(create).get(getAllRecipes)

router.route("/recipes/:id")
    .get(getOneRecipe)
    .put(updateOneRecipe)
    .delete(deleteOneRecipe)

export default router;