import { model, Schema } from "mongoose";
import User from "./user.model.js";
import Recipes from "./recipes.model.js";

const RatingSchema = new Schema(
    {
        ratingValue:{
            type:Number,
            required: [true ,"You must put a rating"],
            default: 0,
            max: [5 ,"Max rating is 5"]
        },
        ratedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Rater field is required!"]
        },
        ratedOn: {
            type: Schema.Types.ObjectId,
            ref: "Recipes",
            required: [true, "ratedOn field is required!"]
        }
    },{ timestamps: true }
)
const Rating = model("Rating", RatingSchema);
export default Rating;