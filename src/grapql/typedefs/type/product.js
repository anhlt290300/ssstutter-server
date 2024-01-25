import { gql } from "apollo-server-express";
import { categoryType } from "./category.js";

const productType = gql`
  ${categoryType}
  type image {
    image: String!
  }

  type color {
    images: [image!]
    mark: String!
    title: String!
  }
  type product {
    _id: ID!
    title: String!
    tag: String
    slug: String!
    categories: [category]
    price: String
    cost: String
    discount: Float
    mark: String
    description: String
    colors: [color]
    suggest: [product]
    available: Boolean
  }

  type productCard {
    _id: ID!
    title: String!
    tag: String
    slug: String!
    categories: [category]
    price: String
    cost: String!
    discount: Float
    mark: String
    colors: Int
    available: Boolean
  }
`;

export { productType };
