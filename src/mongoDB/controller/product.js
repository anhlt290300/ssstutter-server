import {
  categoryRespository,
  productRespository,
} from "../respositories/index.js";

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

const getProduct = async ({ page }) => {
  try {
    let products = await productRespository.getProduct({ page });
    return products;
  } catch (error) {
    return error;
  }
};

const getProductCards = async ({ page, category }) => {
  try {
    let products = await productRespository.getProductCards({ page, category });
    //console.log(products)
    return products;
  } catch (error) {
    return error;
  }
};

const getProductCardsByTag = async ({ page, tag }) => {
  try {
    let products = await productRespository.getProductCardsByTag({ page, tag });
    return products;
  } catch (error) {
    return error;
  }
};

const getProductCardsPromotion = async ({ page, promotion }) => {
  try {
    let products = await productRespository.getProductCardsPromotion({
      page,
      promotion,
    });
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

const getProductBySlug = async ({ slug }) => {
  try {
    let product = await productRespository.getProductBySlug({ slug });
    console.log(product);
    return product;
  } catch (error) {
    return error;
  }
};

export default {
  createProduct,
  getAllproduct,
  getCategoryById,
  getProductBySlug,
  updateCategory,
  deleteCategory,
  getProduct,
  getProductCards,
  getProductCardsByTag,
  getProductCardsPromotion,
};
