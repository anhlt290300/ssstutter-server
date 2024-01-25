import controller from "../../../mongoDB/controller/index.js";

const addProduct = async (_, args) => {
  try {
    const {
      title,
      tag,
      slug,
      categories,
      cost,
      discount,
      mark,
      description,
      colors,
    } = args.product;

    const product = await controller.productController.createProduct({
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

const updateCategory = async (_, args) => {
  try {
    const { title, slug, available, id } = args.category;
    const category = await controller.categoryController.updateCategory({
      title,
      slug,
      available,
      id,
    });
    return category;
  } catch (error) {
    return error;
  }
};

const deleteCategory = async (_, args) => {
  try {
    const { id } = args;
    const category = await controller.categoryController.deleteCategory({
      id,
    });
    return category;
  } catch (error) {
    return error;
  }
};

export default {
  addProduct,
  updateCategory,
  deleteCategory,
};
