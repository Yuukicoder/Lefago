import mongoose from 'mongoose';

const shopMediaSchema = new mongoose.Schema(
  {
    shop_id: {
      type: mongoose.Schema.Types.ObjectId, ref:"Shop",
      required: true,
    },
    type: {type: String, enum:["image", "video"], default: "image"},
    url:{
        type: String, 
        required: true,
    },
    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId, ref:"User"
    }
  },
  { timestamps: true }
);
shopMediaSchema.index({shop_id: 1});
export default mongoose.model('ShopMedia', shopMediaSchema, "shop_media");