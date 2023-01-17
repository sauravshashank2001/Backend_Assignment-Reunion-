const mongoose =  require("mongoose");
const postSchema = new mongoose.Schema({
 
    title : {
        type: String
    },
    description:{
        type: String
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