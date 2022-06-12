import axios from "axios";
const baseURL = "https://jsonplaceholder.typicode.com";

export async function getAllUsers() {
  try {
    const response = await axios.get(baseURL + "/users");
    return response.data;
  } catch (err) {
    return err.message;
  }
}
