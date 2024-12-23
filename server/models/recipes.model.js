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
            required: [true, "You must put how much time the recipe take"],
            min: [1, "You are not super sonic!"]
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
            validate:{
                validator:(t)=>["Vegan","Fruitarian","Omnivores","Carnivores","Vegetarians","Halal"].includes(t),
                message:(props)=>props.value+" is not a recipe category"
            }
        },

        recipeType: {
            type: String,
            validate:{
                validator:(t)=>["Breakfast","Lunch","Dinner","Snacks"].includes(t),
                message:(props)=>props.value+" is not a recipe type"
            }
        },
        
        recipeIngredients: {
            type: [String],
            default:[],
            required:[true,"You must put your Ingredients"]
        }
    },
    { timestamps: true }
)

const Recipes = model("Recipes", RecipesSchema);
export default Recipes