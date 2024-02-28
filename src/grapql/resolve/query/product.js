import controller from "../../../mongoDB/controller/index.js";
import { prisma } from "../../../context.js";
import { convert_price } from "../../../ultis/convert.js";
import Exception from "../../../exception/exception.js";

const pageSize = 10;

const getProductBySlug = async (_, args) => {
  try {
    const { slug } = args;

    if (await prisma.products.findFirst({ where: { slug: slug } })) {
      let rs = await prisma.products.findFirst({ where: { slug: slug } });
      rs.categories = await Promise.all(
        rs.categories.map(async (el) => {
          return await prisma.categories.findFirst({
            where: { id: el },
          });
        })
      );
      const price =
        rs.discount === 0 ? rs.cost : (rs.cost * (100 - rs.discount)) / 100;
      rs.price = convert_price(price);
      rs.cost = convert_price(rs.cost);
      let recommend = await prisma.products.findMany({
        where: {
          tag: "new",
        },
        take: pageSize,
      });

      recommend = await Promise.all(
        recommend.map(async (el) => {
          let {
            id,
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
            categories.map(async (el) => {
              return await prisma.categories.findFirst({
                where: { id: el },
              });
            })
          );

          return {
            id: id,
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
      rs = { ...rs, recommend: recommend };

      return rs;
    } else {
      throw new Exception(Exception.PRODUCT_NOT_EXIST);
    }
  } catch (error) {
    return error;
  }
};

const getAllproduct = async () => {
  try {
    //const products = await controller.productController.getAllproduct();
    const products = await prisma.products.findMany();
    return products;
  } catch (error) {
    return error;
  }
};

const getProductCards = async (_, args) => {
  try {
    const { page, categoryID } = args;

    const skipAmount = (page - 1) * pageSize;

    let rs = categoryID
      ? page > 0
        ? {
            products: await prisma.products.aggregateRaw({
              pipeline: [
                {
                  $match: {
                    categories: { $oid: categoryID },
                  },
                },
                {
                  $limit: pageSize,
                },
                {
                  $skip: skipAmount,
                },
              ],
            }),
            page: page,
            pageSize: pageSize,
          }
        : {
            products: await prisma.products.aggregateRaw({
              pipeline: [
                {
                  $match: {
                    categories: { $eq: categoryID },
                  },
                },
                {
                  $limit: pageSize,
                },
              ],
            }),
            page: 1,
            pageSize: pageSize,
          }
      : page > 0
      ? {
          products: await prisma.products.findMany({
            take: pageSize,
            skip: skipAmount,
          }),
          page: page,
          pageSize: pageSize,
        }
      : {
          products: await prisma.products.findMany({ take: pageSize }),
          page: 1,
          pageSize: pageSize,
        };

    rs.products = await Promise.all(
      rs.products.map(async (el) => {
        let {
          id,
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
          categories.map(async (el) => {
            return await prisma.categories.findFirst({
              where: { id: categoryID ? el.$oid : el },
            });
          })
        );

        return {
          id: categoryID ? _id.$oid : id,
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

    return rs;
  } catch (error) {
    return error;
  }
};

const getProductCardsByTag = async (_, args) => {
  try {
    const { page, tag } = args;

    const skipAmount = (page - 1) * pageSize;

    let rs = page
      ? page > 0
        ? {
            products: await prisma.products.findMany({
              where: {
                tag: tag,
              },
              take: pageSize,
              skip: skipAmount,
            }),
            page: page,
            pageSize: pageSize,
          }
        : {
            products: await prisma.products.findMany({
              where: {
                tag: tag,
              },
              take: pageSize,
            }),
            page: 1,
            pageSize: pageSize,
          }
      : {
          products: await prisma.products.findMany({
            where: {
              tag: tag,
            },
            take: pageSize,
          }),
          page: 1,
          pageSize: pageSize,
        };

    rs.products = await Promise.all(
      rs.products.map(async (el) => {
        let {
          id,
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
          categories.map(async (el) => {
            return await prisma.categories.findFirst({
              where: { id: el },
            });
          })
        );

        return {
          id: id,
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

    return rs;
  } catch (error) {
    return error;
  }
};

const getProductCardsPromotion = async (_, args) => {
  try {
    const { page, promotion } = args;
    const skipAmount = (page - 1) * pageSize;

    let rs = page
      ? page > 0
        ? {
            products: await prisma.products.findMany({
              where: {
                discount: {
                  gt: promotion ? 0 : -1,
                },
              },
              take: pageSize,
              skip: skipAmount,
            }),
            page: page,
            pageSize: pageSize,
          }
        : {
            products: await prisma.products.findMany({
              where: {
                discount: {
                  gt: promotion ? 0 : -1,
                },
              },
              take: pageSize,
            }),
            page: 1,
            pageSize: pageSize,
          }
      : {
          products: await prisma.products.findMany({
            where: {
              discount: {
                gt: promotion ? 0 : -1,
              },
            },
            take: pageSize,
          }),
          page: 1,
          pageSize: pageSize,
        };

    rs.products = await Promise.all(
      rs.products.map(async (el) => {
        let {
          id,
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
          categories.map(async (el) => {
            return await prisma.categories.findFirst({
              where: { id: el },
            });
          })
        );

        return {
          id: id,
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

    return rs;
  } catch (error) {
    return error;
  }
};

export default {
  getAllproduct,
  getProductCards,
  getProductCardsByTag,
  getProductCardsPromotion,
  getProductBySlug,
};
