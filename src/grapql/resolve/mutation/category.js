import controller from "../../../mongoDB/controller/index.js";

const addCategory = async (_, args) => {
  try {
    const { title, slug, available } = args.category;
    const category = await controller.categoryController.createCategory({
      title,
      slug,
      available,
    });
    return category;
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
  addCategory,
  updateCategory,
  deleteCategory,
};
