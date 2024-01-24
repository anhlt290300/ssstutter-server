import query from "./query/index.js";
import mutation from "./mutation/index.js";
const resolvers = {
  Query: {
    getCategoryById: query.categoryQuery.getCategoryById,
    getCategoryBySlug: query.categoryQuery.getCategoryBySlug,
    getAllCategories: query.categoryQuery.getAllCategories,
  },
  Mutation: {
    addCategory: mutation.mutationCategory.addCategory,
    updateCategory: mutation.mutationCategory.updateCategory,
    deleteCategory: mutation.mutationCategory.deleteCategory,
  },
};

export default resolvers;
