import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
  {
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
    }, 
    contact: {
      phoneNumber: {
        type: String, 
        trim: true
      }, 
      email: {
        type: String, 
        trim: true
      },
      facebook: {
        type: String, 
        trim: true
      }, 
      website: {
        type: String, 
        trim: true,
      }
    },
    status: {
      type: String,
      enum: ["pending", "active", "rejected", "suspended"],
      default: "pending"
    }
  },
  { timestamps: true }
);
shopSchema.index(
  {
    destination_id:1,
    slug: 1
  }, {
    unique: true
  });
export default mongoose.model('Shop', shopSchema);