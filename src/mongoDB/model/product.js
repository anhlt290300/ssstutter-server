import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "product",
  new Schema({
    id: { type: ObjectId },
    title: {
      type: String,
      required: true, //NOT NULL
      validate: {
        validator: (value) => value.length > 4,
        message: "title of category must be at least 5 characters",
      },
    },
    slug: {
      type: String,
      required: true, //NOT NULL
      validate: {
        validator: (value) => value.length > 4,
        message: "slug of category must be at least 5 characters",
      },
    },
    available: {
      type: Boolean,
      required: true, //NOT NULL
    },
  })
);
