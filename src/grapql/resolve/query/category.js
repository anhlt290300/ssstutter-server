import controller from "../../../mongoDB/controller/index.js";


const getCategoryById = async (_, args) => {
  try {
    const { id } = args;
    const category = await controller.categoryController.getCategoryById({
      id,
    });
    return category;
  } catch (error) {
    return error;
  }
};

const getCategoryBySlug = async (_, args) => {
  try {
    const { slug } = args;
    const category = await controller.categoryController.getCategoryBySlug({
      slug,
    });
    return category;
  } catch (error) {
    return error;
  }
};

const getAllCategories = async () => {
  try {
    const categories = await controller.categoryController.getAllCategory();
    return categories;
  } catch (error) {
    return error;
  }
};

export default {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
};
