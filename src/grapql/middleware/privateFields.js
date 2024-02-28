const isPrivated = async (resolve, parent, args, ctx, info) => {
  throw new Error(`access privated field`);
};

export const privateFields = {
  product: {
    title: isPrivated,
  },
};
