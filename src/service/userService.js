import { getRequest, postRequest, putRequest } from "./service";

const API_URL = "users/";

export async function login(data) {
  const loginResponse = await postRequest(`${API_URL}login`, data);
  return loginResponse;
}

export async function register(data) {
  const registerResponse = await postRequest(`${API_URL}`, data);
  return registerResponse;
}
export async function update(data) {
  const updatedResponse = await putRequest(`${API_URL}`, data);
  return updatedResponse;
}
export async function updatePassword(data) {
  const updatedPasswordResponse = await putRequest(
    `${API_URL}update-password`,
    data
  );
  return updatedPasswordResponse;
}
export async function userinfo(data) {
  const userInfo = await getRequest(`${API_URL}me`, data);
  return userInfo;
}
