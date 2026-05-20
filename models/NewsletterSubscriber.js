import mongoose from "mongoose";

const NewsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    subscribed: {
      type: Boolean,
      default: true,
    },

    interests: {
      type: [String],
      default: [
        "research-updates",
        "product-launches",
        "exclusive-offers",
        "discounts",
      ],
    },

    source: {
      type: String,
      default: "biopeptide-footer-newsletter",
    },

    unsubscribeToken: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    unsubscribedAt: {
      type: Date,
      default: null,
    },

    lastEmailSentAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.NewsletterSubscriber ||
  mongoose.model("NewsletterSubscriber", NewsletterSubscriberSchema);