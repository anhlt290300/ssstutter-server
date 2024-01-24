import model from "../model/index.js";
import Exception from "../../exception/exception.js";

const existingCategoryBySlug = async ({ slug }) => {
  return await model.category.findOne({ slug: slug }).exec();
};

const existingCategoryById = async ({ id }) => {
  return await model.category.findOne({ _id: id }).exec();
};

const getAllCategory = async () => {
  const categories = await model.category.find({});
  return categories;
};

const getCategoryById = async ({ id }) => {
  const category = await model.category.findOne({ _id: id });
  return category;
};

const getCategoryBySlug = async ({ slug }) => {
  const category = await model.category.findOne({ slug: slug });
  return category;
};

const createCategory = async ({ title, slug, available }) => {
  //console.log(available);
  if (!!(await existingCategoryBySlug({ slug }))) {
    throw new Exception(Exception.CATEGORY_EXIST);
  }
  const category = await model.category.create({
    title,
    slug,
    available,
  });
  return category;
};

const updateCategory = async ({ title, slug, available, id }) => {
  //console.log(available);

  const existingCategory = await existingCategoryById({ id });
  if (!existingCategory) {
    throw new Exception(Exception.CATEGORY_NOT_EXIST);
  }
  if (title) existingCategory.title = title;
  if (slug) existingCategory.slug = slug;
  if (available) existingCategory.available = available;
  await model.category.updateOne(
    { _id: id },
    {
      title: existingCategory.title,
      slug: existingCategory.slug,
      available: existingCategory.available,
    }
  );
  return existingCategory;
};

const deleteCategory = async ({ id }) => {
  //console.log(available);

  const existingCategory = await existingCategoryById({ id });

  if (!existingCategory) {
    throw new Exception(Exception.CATEGORY_NOT_EXIST);
  }

  await model.category.deleteOne({ _id: id });
  return existingCategory;
};

export default {
  createCategory,
  getAllCategory,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
