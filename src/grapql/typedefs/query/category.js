import { gql } from "apollo-server-express";

const categoryQuery = gql`
  type Query {
    getCategoryById(id: ID!): category
    getCategoryBySlug(slug: String): category
    getAllCategories: [category]
  }
`;

export default categoryQuery;
