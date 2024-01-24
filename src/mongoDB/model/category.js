import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "category",
  new Schema({
    id: { type: ObjectId },
    title: {
      type: String,
      required: true, //NOT NULL
      validate: {
        validator: (value) => value.length > 3,
        message: "title of category must be at least 4 characters",
      },
    },
    slug: {
      type: String,
      required: true, //NOT NULL
      validate: {
        validator: (value) => value.length > 3,
        message: "slug of category must be at least 4 characters",
      },
    },
    available: {
      type: Boolean,
      required: true, //NOT NULL
    },
  })
);
