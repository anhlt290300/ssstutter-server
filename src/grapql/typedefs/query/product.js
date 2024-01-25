import { gql } from "apollo-server-express";

const productQuery = gql`
  type Query {
    getProductById(id: ID!): product
    getProductBySlug(slug: String): product
    getAllproduct: [product]
    getProductCard: [productCard]
  }
`;

export default productQuery;
