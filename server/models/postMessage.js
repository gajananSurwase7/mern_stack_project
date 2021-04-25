import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    occupation: {
        type: String, 
        enum: {
            values: ["employed",
                "student",
                "business"
            ]
        }
    },
    dob: { type: Date},
    status: {
        type: String,
        enum: {
            values: ["Active", "Inactive"]
        }
    },
    bio: { type: String },
    profilePicture: { type: String }

})


const postMessage = mongoose.model('postMessage',postSchema);

export default postMessage;

