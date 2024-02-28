import controller from "../../../mongoDB/controller/index.js";
import { prisma } from "../../../context.js";
import Exception from "../../../exception/exception.js";

const addCategory = async (_, args, context, info) => {
  try {
    const category = await prisma.categories.create({
      data: {
        title: args.title,
        slug: args.slug,
      },
    });
    return category;
  } catch (error) {
    return error;
  }
};

const updateCategory = async (_, args) => {
  try {
    const { title, slug, available, id } = args;
    // const category = await controller.categoryController.updateCategory({
    //   title,
    //   slug,
    //   available,
    //   id,
    // });
    console.log(id);
    const category = await prisma.categories.findFirst({ where: { id: id } });
    if (!category) throw new Exception(Exception.CATEGORY_NOT_EXIST);
    else {
      return await prisma.categories.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          slug: slug,
          available: available,
        },
      });
    }
  } catch (error) {
    return error;
  }
};

const deleteCategory = async (_, args) => {
  try {
    const { id } = args;
    // const category = await controller.categoryController.deleteCategory({
    //   id,
    // });
    const category = await prisma.categories.findFirst({ where: { id } });
    if (!category) throw new Exception(Exception.CATEGORY_NOT_EXIST);
    else {
      return await prisma.categories.delete({ where: { id } });
    }
  } catch (error) {
    return error;
  }
};

export default {
  addCategory,
  updateCategory,
  deleteCategory,
};
