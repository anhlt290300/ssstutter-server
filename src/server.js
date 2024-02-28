import express from "express";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { privateFields } from "./grapql/middleware/privateFields.js";
import { createContext } from "./context.js";
dotenv.config();
import typeDefs from "./grapql/typedefs/index.js";
import resolvers from "./grapql/resolve/index.js";
import connect from "../database/connect.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentails: true,
  optionSuccessStatus: 200,
  port: 3000,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      token: req.headers.authorization || "",
    };
  },
});
await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(
    `Server running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
