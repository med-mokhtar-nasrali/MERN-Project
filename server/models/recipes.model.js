import { model, Schema } from "mongoose";

const RecipesSchema = new Schema(
    {
        recipeName: {
            type: String,
            required: [true, "You must put a name for the recipe!"],
            minlength: [2, "Rceipe name must be at least 2 chars!"],
            maxlength: [255, "Rcipe name must be less than 255 chars!"]
        },

        recipeDescription: {
            type: String,
            required: [true, "Recipe must have a description!"],
            minlength: [10, "Recipe description must be at least 10 chars!"]
        },

        recipeDuration: {
            type: Number,
            required: [true, "You must put how much time the recipe take"]
        },
        
        recipeImg: {
            type: String,
            required: [true, "You must share the photo of the recipe"]
        },

        recipeDirections: {
            type: String,
            required: [true, "You must put the steps of the recipe"],
            minlength: [30, "Recipe directions must be at least 30 chars!"]
        },

        recipeCategory: {
            type: String,
            required: [true, "You must declare in wich categorie your recipe will be"]
        },

        recipeType: {
            type: String,
            required: [true, "You must put the type of the recipe (Breaskfast, Dinner, etc..)"]
        }
    },
    { timestamps: true }
)

const Recipes = model("Recipes", RecipesSchema);
export default Recipes