import { gql } from "apollo-server-express";

const productQuery = gql`
  type Query {
    getProductById(id: ID!): product
    getProductBySlug(slug: String): product
    getAllproduct: [product]
    getProductCards(page: Int, categoryID: ID): arrProductCard
    getProductCardsByTag(page: Int, tag: String): arrProductCard
    getProductCardsPromotion(page: Int, promotion: Boolean): arrProductCard
  }
`;

export default productQuery;
