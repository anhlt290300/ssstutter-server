const convert_price = (price) => {
  //   const formatter = new Intl.NumberFormat("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //     currencyDisplay: 'none', // Use narrow symbol, empty string for no symbol
  //   });

  //   return formatter.format(price).replaceAll(".", ",").trim();
  return price.toLocaleString("vi-VN").replace(/\./g, ",");
};

export { convert_price };
