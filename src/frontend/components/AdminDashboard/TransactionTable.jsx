function TransactionTable({ transactions }) {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Phone</th>
            <th>Amount</th>
            <th>Card Number</th>
            <th>CVC</th>
            <th>Date</th>
            <th>Time</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.phone}</td>
              <td>{tx.amount}</td>
              <td>{tx.cardNumber}</td>
              <td>{tx.cvc}</td>
              <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
              <td>{new Date(tx.createdAt).toLocaleTimeString()}</td>
              <td>{tx._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
