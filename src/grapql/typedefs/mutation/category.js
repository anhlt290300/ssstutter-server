import { gql } from "apollo-server-express";

const categoryMutation = gql`
  type Mutation {
    addCategory(title: String, slug: String): category
    updateCategory(
      id: ID!
      title: String!
      slug: String!
      available: Boolean
    ): category
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
