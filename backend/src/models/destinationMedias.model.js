import mongoose from "mongoose";
const destinationMediaSchema = new mongoose.Schema({
    destination_id: {type:mongoose.Schema.Types.ObjectId, ref:"Destination"},
    type: {type: String, enum:["image", "video"], default:"image"},
    url: {type: String, required: true},
    uploaded_by: {type:mongoose.Schema.Types.ObjectId, ref:"User"}

},{
    timestamps:true,
})

destinationMediaSchema.index({destination_id:1});
const DestinationMedia = mongoose.model("DestinationMedia", destinationMediaSchema, "destination_media");
export default DestinationMedia;