import { gql } from "apollo-server-express";
import { categoryType } from "./category.js";

const productType = gql`
  ${categoryType}
  type image {
    image: String!
  }

  type color {
    images: [String]
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
    recommend: [productCard]
    available: Boolean
  }

  type productCard {
    id: ID!
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

  type arrProductCard {
    products: [productCard]!
    page: Int!
    pageSize: Int!
  }
`;

export { productType };
