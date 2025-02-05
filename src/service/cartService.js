import { deleteRequest, getRequest, postRequest, putRequest } from "./service";

const API_URL = "cart/";

export async function fetchCart(userId) {
  const carts = await getRequest(`${API_URL}`, { userId });
  console.log("response", carts);
  return carts.items || [];
}

export async function addToCart(productId) {
  console.log("productId, quantity", productId);

  try {
    const response = await postRequest(`${API_URL}add`, { productId });

    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении товара в корзину:", error);
    throw error;
  }
}
export async function removeCart(itemId) {
  const removedCart = await deleteRequest(`${API_URL}remove/${itemId}`);
  return removedCart;
}
export async function updateCartItem(itemId, productId, newQuantity) {
    const updateCartItem = await putRequest(`${API_URL}update`, {
      itemId,
      productId,
      newQuantity,
    });
    return updateCartItem;
  }
  
