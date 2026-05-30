import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
  {
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    destination_id: {type: mongoose.Schema.Types.ObjectId, ref:"Destination"},
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {type: String, required: true},
    type: [{
        type: String,
        enum : ["restaurant", "hotel", "homestay", "cafe"],
        required: true,
    }],
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String
    }
  },
  { timestamps: true }
);
shopSchema.index({destination_id:1});
export default mongoose.model('Shop', shopSchema);