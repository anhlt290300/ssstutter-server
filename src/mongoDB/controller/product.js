import {
  categoryRespository,
  productRespository,
} from "../respositories/index.js";
import HttpStatusCode from "../../exception/HttpsStatusCode.js";

const createProduct = async ({
  title,
  slug,
  categories,
  cost,
  tag,
  discount,
  mark,
  description,
  colors,
}) => {
  try {
    let product = await productRespository.createProduct({
      title,
      slug,
      categories,
      cost,
      tag,
      discount,
      mark,
      description,
      colors,
    });
    return product;
  } catch (error) {
    return error;
  }
};

const updateCategory = async ({ title, slug, available, id }) => {
  try {
    let category = await categoryRespository.updateCategory({
      id,
      title,
      slug,
      available,
    });
    return category;
  } catch (error) {
    return error;
  }
};

const deleteCategory = async ({ id }) => {
  try {
    let category = await categoryRespository.deleteCategory({
      id,
    });
    return category;
  } catch (error) {
    return error;
  }
};

const getAllproduct = async () => {
  try {
    let products = await productRespository.getAllproduct();
    return products;
  } catch (error) {
    return error;
  }
};

const getCategoryById = async ({ id }) => {
  try {
    let category = await categoryRespository.getCategoryById({ id });
    return category;
  } catch (error) {
    return error;
  }
};

const getCategoryBySlug = async ({ slug }) => {
  try {
    let category = await categoryRespository.getCategoryBySlug({ slug });
    return category;
  } catch (error) {
    return error;
  }
};

export default {
  createProduct,
  getAllproduct,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
