import model from "../model/index.js";
import Exception from "../../exception/exception.js";
import { convert_price } from "../../ultis/convert.js";
import products from "./data.js";
const pageSize = 10;

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

const getProduct = async ({ page }) => {
  if (page <= 0) {
    return await model.product.find({}).limit(pageSize);
  }
  const skipAmount = (page - 1) * pageSize;
  const products = await model.product
    .find({})
    .skip(skipAmount)
    .limit(pageSize);
  return products;
};

const getProductCards = async ({ page, category }) => {
  if (page <= 0 || page === undefined) {
    return {
      products: await model.product.find({}).limit(pageSize),
      page: 1,
      pageSize: pageSize,
    };
  }
  const skipAmount = (page - 1) * pageSize;
  let products = category
    ? await model.product
        .aggregate([
          {
            $match: {
              "categories": category,
            },
          },
        ])
        .skip(skipAmount)
        .limit(pageSize)
    : await model.product.find({}).skip(skipAmount).limit(pageSize);
  products = await Promise.all(
    products.map(async (el) => {
      let {
        _id,
        title,
        tag,
        slug,
        categories,
        cost,
        discount,
        mark,
        colors,
        available,
      } = el;
      let price = discount === 0 ? cost : (cost * (100 - discount)) / 100;
      //console.log(categories[0].toString())
      categories = await Promise.all(
        categories.map(
          async (el) => await model.category.findOne({ _id: el.toString() })
        )
      );

      return {
        _id: _id,
        title: title,
        tag: tag,
        slug: slug,
        categories: categories,
        cost: convert_price(cost),
        price: convert_price(price),
        discount: discount,
        mark: mark,
        colors: colors.length,
        available: available,
      };
    })
  );

  return {
    products: products,
    page: page,
    pageSize: pageSize,
  };
};

const getProductCardsByTag = async ({ page, tag }) => {
  if (page <= 0) {
    return await model.product.find({}).limit(pageSize);
  }

  const skipAmount = (page - 1) * pageSize;
  let products =
    tag !== undefined
      ? await model.product
          .aggregate([
            {
              $match: {
                tag: tag,
              },
            },
          ])
          .skip(skipAmount)
          .limit(pageSize)
      : await model.product.find({}).skip(skipAmount).limit(pageSize);
  products = await Promise.all(
    products.map(async (el) => {
      let {
        _id,
        title,
        tag,
        slug,
        categories,
        cost,
        discount,
        mark,
        colors,
        available,
      } = el;
      let price = discount === 0 ? cost : (cost * (100 - discount)) / 100;
      //console.log(categories[0].toString())
      categories = await Promise.all(
        categories.map(
          async (el) => await model.category.findOne({ _id: el.toString() })
        )
      );

      return {
        _id: _id,
        title: title,
        tag: tag,
        slug: slug,
        categories: categories,
        cost: convert_price(cost),
        price: convert_price(price),
        discount: discount,
        mark: mark,
        colors: colors.length,
        available: available,
      };
    })
  );

  //console.log(products[0].categories);
  return {
    products: products,
    page: page,
    pageSize: pageSize,
  };
};

const getProductCardsPromotion = async ({ page, promotion }) => {
  if (page <= 0) {
    return await model.product.find({}).limit(pageSize);
  }

  const skipAmount = (page - 1) * pageSize;
  let products = promotion
    ? await model.product
        .find({ discount: { $gte: 0 } })
        .sort({ discount: -1 })
        .skip(skipAmount)
        .limit(pageSize)
    : await model.product.find({}).skip(skipAmount).limit(pageSize);
  products = await Promise.all(
    products.map(async (el) => {
      let {
        _id,
        title,
        tag,
        slug,
        categories,
        cost,
        discount,
        mark,
        colors,
        available,
      } = el;
      let price = discount === 0 ? cost : (cost * (100 - discount)) / 100;
      //console.log(categories[0].toString())
      categories = await Promise.all(
        categories.map(
          async (el) => await model.category.findOne({ _id: el.toString() })
        )
      );

      return {
        _id: _id,
        title: title,
        tag: tag,
        slug: slug,
        categories: categories,
        cost: convert_price(cost),
        price: convert_price(price),
        discount: discount,
        mark: mark,
        colors: colors.length,
        available: available,
      };
    })
  );

  //console.log(products[0].categories);
  return {
    products: products,
    page: page,
    pageSize: pageSize,
  };
};

const getAllproduct = async () => {
  // console.log("a");
  await model.product.deleteMany({});
  await Promise.all(
    products.forEach(async (e) => {
      let {
        slug,
        category,
        title,
        tag,
        price,
        cost,
        discount,
        mark,
        description,
        colors,
      } = e;

      category = await Promise.all(
        category.map(async (e_) => {
          let c = model.category.findOne({ slug: e_ });
          return c;
        })
      );
      await createProduct({
        title,
        slug: slug.replace("https://ssstutter.com/p/", ""),
        categories: category,
        cost: cost.replaceAll(",", ""),
        tag,
        discount,
        mark,
        description,
        colors,
      });
    })
  );
  const products2 = await model.product.find({});
  return products2;
};

const getCategoryById = async ({ id }) => {
  const category = await model.category.findOne({ _id: id });
  return category;
};

const getProductBySlug = async ({ slug }) => {
  let product = await model.product.findOne({ slug: slug });
  let {
    _id,
    title,
    tag,
    categories,
    cost,
    discount,
    mark,
    colors,
    available,
    description,
  } = product;
  let price = discount === 0 ? cost : (cost * (100 - discount)) / 100;
  categories = await Promise.all(
    categories.map(
      async (el) => await model.category.findOne({ _id: el.toString() })
    )
  );

  product = {
    _id: _id,
    title: title,
    tag: tag,
    slug: slug,
    categories: categories,
    cost: convert_price(cost),
    price: convert_price(price),
    discount: discount,
    description: description,
    mark: mark,
    colors: colors,
    available: available,
  };
  return product;
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
  getProduct,
  getProductCards,
  getProductCardsByTag,
  getProductCardsPromotion,
  getProductBySlug,
};
