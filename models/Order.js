//models\Order.js

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    // 🔗 USER LINK (VERY IMPORTANT)
    
    checkoutId: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    userEmail: { type: String, default: "" },
    userName: { type: String, default: "" },
    phone: { type: String, default: "" },

    address: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
      country: String,
    },

    items: [
      {
        id: String,
        name: String,
        price: Number,
        strength: String,
        image: String,
        slug: String,
        qty: Number,
      },
    ],

    totals: {
      subtotal: Number,
      shipping: Number,
      tax: Number,
      total: Number,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
