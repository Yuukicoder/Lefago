import mongoose from 'mongoose';

const shopClaimSchema = new mongoose.Schema(
  {
    shop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop"
    },
    requested_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ["create", "claim"],
        default: "create"
    },
    role_requested: {
        type: String, 
        enum: ["owner", "manager"],
        default: "owner",
        required: true
    },
    status: {
        type: String, 
        enum: ["pending", "approved", "rejected", "cancelled"],
        default: "pending"
    },
    verification: {
        phone: {
            type: String,
            default: ""
        },
        email: {
            type: String, 
            default: ""
        }, 
        document_url: {
            type: String,
            default: ""
        },
        note: {
            type: String, 
            default: ""
        }
    },
    reviewed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewed_at: {
        type: Date, 
        default: null
    },
    rejection_reason: {
        type: String,
        default: ""
    }
  },
  { timestamps: true }
);

// Support admin lấy shop theo trạng thái
shopClaimSchema.index({
    status: 1,
    createAt: -1
})
// Support user xem các yêu cầu của mình
shopClaimSchema.index({
    requested_by: 1,
    createAt: -1
})
// Không cho cùng 1 user gửi nhiều claim pending cho cùng 1 shop
shopClaimSchema.index({
    shop_id: 1,
    requested_by: 1,
}, {
    unique: true, 
    partialFilterExpression: {
        status: "pending",
        shop_id: {$type: "objectId"},
        requested_by: {$type: "objectId"}
    }

})
export default mongoose.model('ShopClaim', shopClaimSchema);