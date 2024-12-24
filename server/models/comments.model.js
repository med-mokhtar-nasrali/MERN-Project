import { model, Schema } from "mongoose";
import User from "./user.model.js";
import Recipes from "./recipes.model.js";

const CommentsSchema = new Schema(
    {
        commentMessage: {
            type: String,
            required: [true, "Comment can't be empty!"],
            minlength: [2, "Comment must be at least 2 chars"],
            maxlength: [255, "Comment must be less than 255 chars"]
        },
        commentedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "CommentedBy field is required!"]
        },
        commentedOn: {
            type: Schema.Types.ObjectId,
            ref: "Recipes",
            required: [true, "CommentedOn field is required!"]
        }
    },
    { timestamps: true }
);

const Comments = model("Comments", CommentsSchema);
export default Comments;
