import { print, OutputType } from "../helps/print.js";

export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD =
    "Wrong datatabase's username and password";
  static WRONG_CONNECTION_STRING = "Wrong server name/connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongoose";
  static USER_EXIST = "User already exists";
  static PRODUCT_EXIST = "Product already exists";
  static PRODUCT_NOT_EXIST = "Product not already exists";
  static CATEGORY_EXIST = "Category already exists";
  static CATEGORY_NOT_EXIST = "Category not exists";
  static COLLECTION_CHILD_EXIST = "Collection child already exists";
  static COLLECTION_CHILD_NOT_EXIST = "Collection child not already exists";
  static COLLECTION_CHILD_TOO_SLOW = "Collection child length too slow";
  static BLOG_COLLECTION_EXIST = "Blog collection already exists";
  static BLOG_COLLECTION_NOT_EXIST = "Blog collection not exists";
  static BLOG_EXIST = "Blog already exists";
  static BLOG_NOT_EXIST = "Blog not exists";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static WRONG_EMAIL_AND_PASSWORD = "Wrong email and password";
  static VOUCHER_EXIST = "Voucher already exists";
  static VOUCHER_NOT_EXIST = "Voucher not already exists";

  constructor(message, validationErrors = {}) {
    super(message); //call constructor of parent class(Error)
    print(message, OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}