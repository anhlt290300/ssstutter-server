import { gql } from "apollo-server-express";

const categoryType = gql`
  type category {
    id: ID!
    title: String
    slug: String
    available: Boolean
  }
`;

export { categoryType };
