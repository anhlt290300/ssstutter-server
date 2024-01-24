import { gql } from "apollo-server-express";
import { categoryType } from "./category.js";

const productType = gql`
  ${categoryType}
  type image {
    id: ID!
    image: String!
  }
  type images {
    images: [image!]!
  }

  type color {
    images: images
    mark: String!
    title: String!
  }
  type product {
    id: ID!
    title: String!
    tag: String
    slug: String!
    categories: [category]
    price: String
    cost: String!
    discount: Float
    mark: String
    description: String
    colors: [color]
    color_length: Int
    suggest: [product]
    available: Boolean
  }
`;

export { productType };
