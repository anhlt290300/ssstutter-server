import { categoryRespository } from "../respositories/index.js";
import HttpStatusCode from "../../exception/HttpsStatusCode.js";

const createCategory = async ({ title, slug, available }) => {
  try {
    let category = await categoryRespository.createCategory({
      title,
      slug,
      available,
    });
    return category;
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

const getAllCategory = async () => {
  try {
    let categories = await categoryRespository.getAllCategory();
    return categories;
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
  createCategory,
  getAllCategory,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
