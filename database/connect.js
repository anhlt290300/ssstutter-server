import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import { print, OutputType } from '../src/helps/print.js'
import Exception from "../src/exception/exception.js";

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    print("Connect mongoose successfully!!", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    const { code } = error;
    if (error.code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }

    throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
  }
};

export default connect;