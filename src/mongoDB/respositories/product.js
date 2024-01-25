import model from "../model/index.js";
import Exception from "../../exception/exception.js";

const existingCategoryBySlug = async ({ slug }) => {
  return await model.category.findOne({ slug: slug }).exec();
};

const existingCategoryById = async ({ id }) => {
  return await model.category.findOne({ _id: id }).exec();
};

const existingProductBySlug = async ({ slug }) => {
  return await model.product.findOne({ slug: slug }).exec();
};

const existingProductById = async ({ id }) => {
  return await model.product.findOne({ _id: id }).exec();
};

const getAllproduct = async () => {
  const products = await model.product.find({});
  return products;
};

const getCategoryById = async ({ id }) => {
  const category = await model.category.findOne({ _id: id });
  return category;
};

const getCategoryBySlug = async ({ slug }) => {
  const category = await model.category.findOne({ slug: slug });
  return category;
};

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
  //console.log(available);
  if (!!(await existingProductBySlug({ slug }))) {
    throw new Exception(Exception.PRODUCT_EXIST);
  }
  const product = await model.product.create({
    title,
    slug,
    categories,
    cost,
    tag,
    discount,
    mark,
    description,
    colors,
    available: false,
  });
  return product;
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
  createProduct,
  getAllproduct,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
