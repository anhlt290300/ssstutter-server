import { gql } from "apollo-server-express";

const categoryMutation = gql`
  type Mutation {
    addCategory(category: addCategoryInput): category
    updateCategory(category: updateCategoryInput): category
    deleteCategory(id: ID!): category
  }

  input addCategoryInput {
    title: String!
    slug: String!
  }

  input updateCategoryInput {
    id: ID!
    title: String
    slug: String
    available: Boolean
  }
`;

export { categoryMutation };
