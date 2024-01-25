import controller from "../../../mongoDB/controller/index.js";

const getProductById = async (_, args) => {
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

const getProductBySlug = async (_, args) => {
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

const getAllproduct = async () => {
  try {
    const products = await controller.productController.getAllproduct();
    return products;
  } catch (error) {
    return error;
  }
};

const getProductCard = async () => {
  try {
    const categories = await controller.categoryController.getAllCategory();
    return categories;
  } catch (error) {
    return error;
  }
};

export default {
  getAllproduct,
};
