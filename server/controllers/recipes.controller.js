import Recipes from "../models/recipes.model.js";

//creat a new recipe
async function create(req, res) {
	try {
		const newRecipe = await Recipes.create(req.body);
		res.json(newRecipe);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
}
//show all recipes
async function getAllRecipes(req, res) {
	try {
		const allRecipes = await Recipes.find();
		res.json(allRecipes);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}
//get one recipe by id
async function getOneRecipe(req, res) {
	try {
		const foundRecipe = await Recipes.findById(req.params.id);
		res.json(foundRecipe);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}
//update one recipe by id
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
		console.log(error);
		res.status(400).json(error);
	}
}
//delete one recipe by id
async function deleteOneRecipe(req, res) {
	try {
		const deletedRecipe = await Recipes.findByIdAndDelete(
			req.params.id
		);
		res.json(deletedRecipe);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}

export {
	create, getAllRecipes, getOneRecipe, updateOneRecipe, deleteOneRecipe
};