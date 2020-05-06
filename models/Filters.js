const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// in order to use .populate in the route file, you must first have the type for what you will populate as Schema.Types.ObjectId and make sure to ref (reference) the model that it will be searching that ID for in your db collection
// author: {type: Schema.Types.ObjectId, ref: 'User'}
// if your using an array of object ids then it would look like the code below
// messages: {type: [{type: Schema.Types.ObjectId, ref: 'Message'}]}
// notice that when you reference you use the capitalization of the model that it is referencing

const filtersSchema = new Schema(
    {
        // favorite movies
        filter1: {
            type: Number
        },
        filter2: {
            type: Number
        },       
        username: {
            type: String
        },
    },
    { timestamps: true }
);



const filtersList = model("Filter", filtersSchema);
module.exports = filtersList;
