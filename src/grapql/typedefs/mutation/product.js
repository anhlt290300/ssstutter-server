import { gql } from "apollo-server-express";

const productMutation = gql`
  type Mutation {
    addProduct(product: addProductInput): product
    # updateProduct(category: updateCategoryInput): product
    # deleteProduct(id: ID!): product
  }

  input addProductInput {
    title: String!
    tag: String
    slug: String!
    categories: [String!]!
    cost: Float!
    discount: Float
    mark: String!
    description: String
    colors: [addColorInput!]!
  }

  input addColorInput {
    images: [String!]!
    mark: String!
    title: String!
  }

  input updateCategoryInput {
    id: ID!
    title: String
    slug: String
    available: Boolean
  }
`;

export { productMutation };
