const products = [];
const getProductBySlug = (_id) => products.find((e) => e._id === _id);
const getCartStorage = (cart) => {
  let res = [];
  if (cart.length > 0) {
    cart.forEach((e) => {
      let product = getProductBySlug(e._id);

      res.push({
        ...e,
        product: product,
      });
    });
  }
};

export default getCartStorage;
