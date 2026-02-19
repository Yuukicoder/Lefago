import mongoose from "mongoose";
const destinationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug:{type: String, required: true},
    description:{type: String},
    address: {type: String},
    lat: {type: Number},
    long: {type: Number},
    region: {type: String},
    thumbnail: {type: String}
},{
    timestamps: true
}
)
const Destination = mongoose.model("Destination", destinationSchema);
export default Destination; 