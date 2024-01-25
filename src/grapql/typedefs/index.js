import { gql } from "apollo-server-express";
import type from "./type/index.js";
import query from "./query/index.js";
import mutation from "./mutation/index.js";
const typeDefs = gql`
  # type
  ${type.productType}
  ${type.categoryType}

  # query
  ${query.categoryQuery}
  ${query.productQuery}

  # mutation
  ${mutation.productMutation}
  ${mutation.categoryMutation}
`;

export default typeDefs;
