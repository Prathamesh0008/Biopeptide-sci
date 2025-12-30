//peptides\models\Address.js
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullName: String,
    email: String,
    phone: String,
    house: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  { timestamps: true }
);

export default mongoose.models.Address ||
  mongoose.model("Address", AddressSchema);
