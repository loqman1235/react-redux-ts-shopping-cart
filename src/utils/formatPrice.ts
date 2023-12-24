const formatPrice = (price: number, currencySymbol: string = "$"): string => {
  // Check if the price is a valid number
  if (isNaN(price)) {
    return "Invalid Price";
  }

  // Convert the price to a fixed decimal with two digits
  const formattedPrice = Number(price).toFixed(2);

  // Add commas for thousands separator
  const priceWithCommas = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Add a currency symbol or code if needed
  return currencySymbol + priceWithCommas;
};

export default formatPrice;
