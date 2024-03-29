import query from "./query/index.js";
import mutation from "./mutation/index.js";
const resolvers = {
  Query: {
    getCategoryById: query.categoryQuery.getCategoryById,
    getCategoryBySlug: query.categoryQuery.getCategoryBySlug,
    getAllCategories: query.categoryQuery.getAllCategories,

    getAllproduct: query.productQuery.getAllproduct,
    getProductCards: query.productQuery.getProductCards,
    getProductCardsByTag: query.productQuery.getProductCardsByTag,
    getProductCardsPromotion: query.productQuery.getProductCardsPromotion,
    getProductBySlug: query.productQuery.getProductBySlug,
  },
  Mutation: {
    addCategory: mutation.mutationCategory.addCategory,
    updateCategory: mutation.mutationCategory.updateCategory,
    deleteCategory: mutation.mutationCategory.deleteCategory,

    addProduct: mutation.mutationProduct.addProduct,
  },
  // productCard :{
  //   getProductCard :
  // }
};

export default resolvers;
