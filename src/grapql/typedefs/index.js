import { gql } from "apollo-server-express";
import type from "./type/index.js";
import query from "./query/index.js";
import mutation from "./mutation/index.js";
const typeDefs = gql`
  ${type.productType}
  ${type.categoryType}

  ${query.categoryQuery}

  ${mutation.categoryMutation}
`;

export default typeDefs;
