import mongoose from "mongoose";
const destinationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug:{type: String, required: true},
    description:{type: String},
    type: {
        type: String, enum: ["province","city","area", "attraction"], 
        default: "city",
    },
    address: {type: String},
    lat: {type: Number},
    long: {type: Number},
    region: {type: String},
    thumbnail: {type: String},
    createdBy: {type:String, required: true}
},{
    timestamps: true
}
)
const Destination = mongoose.model("Destination", destinationSchema);
export default Destination; 