import mongoose, { Schema, ObjectId } from "mongoose";

const colorSchema = new mongoose.Schema({
  mark: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true, //NOT NULL
    validate: {
      validator: (value) => value.length > 0,
      message: "title of color must be at least 1 characters",
    },
  },
  images: {
    type: [String],
    required: true, //NOT NULL
    validate: {
      validator: (value) => value.length >= 0,
      message: "images must be at least 1 image",
    },
  },
});

export default mongoose.model(
  "product",
  new Schema({
    id: { type: ObjectId },
    title: {
      type: String,
      required: true, //NOT NULL
      unique: true,
      validate: {
        validator: (value) => value.length > 4,
        message: "title of product must be at least 5 characters",
      },
    },
    slug: {
      type: String,
      required: true, //NOT NULL
      unique: true,
      validate: {
        validator: (value) => value.length > 4,
        message: "slug of product must be at least 5 characters",
      },
    },
    tag: {
      type: String,
      require: false,
    },
    categories: {
      type: [ObjectId],
      require: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "categories must be at least 1 category",
      },
    },
    cost: {
      type: Number,
      unique: false,
      required: true,
      validate: {
        validator: (value) => value > 0,
        message: "cost must be > 0",
      },
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
      validate: {
        validator: (value) => value >= 0,
        message: "discount must be >= 0",
      },
    },
    mark: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    colors: {
      type: [colorSchema],
      required: true, //NOT NULL
      validate: {
        validator: (value) => value.length > 0,
        message: "colors must be at least 1 color",
      },
    },
    available: {
      type: Boolean,
      required: true, //NOT NULL
    },
  })
);
