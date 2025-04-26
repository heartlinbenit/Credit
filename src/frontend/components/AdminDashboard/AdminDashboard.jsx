import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/api";
import TransactionTable from "./TransactionTable";
import Charts from "./Charts";

function AdminDashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <Charts transactions={transactions} />
      <TransactionTable transactions={transactions} />
    </div>
  );
}

export default AdminDashboard;
