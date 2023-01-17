const mongoose =  require("mongoose");
const postSchema = new mongoose.Schema({
 
    title : {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes:[
        {
            
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment: {
                type: String,
                required: true
            }
        }

    ]

});

module.exports = mongoose.model("Post",postSchema);