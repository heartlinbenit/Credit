import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" }); // Change later if needed

export const createTransaction = (transactionData) => API.post("/transaction", transactionData);
export const getAllTransactions = () => API.get("/transaction");
