import mongoose, { Schema } from 'mongoose';

const shop_membersSchema = new mongoose.Schema(
  {
    shop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
     user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: [{
        type: String,
        enum: ["owner", "manager", "staff"],
        default: "owner"
    }],
    status: {
        type: String, 
        enum: ["pending", "active", "removed"],
        default: "active"
    },
    invited_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
  },
  { timestamps: true }
);
shop_membersSchema.index({
    shop_id: 1, 
    user_id: 1, 
},{
    unique: true
})
// Support query cho các shop mà user quản lý
shop_membersSchema.index({
    user_id: 1, 
    status: 1,
})
// Support query thành viên của 1 shop
shop_membersSchema.index({
    shop_id: 1,
    status: 1
})


export default mongoose.model('ShopMember', shop_membersSchema);