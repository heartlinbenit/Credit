// function TransactionTable({ transactions }) {
//   return (
//     <div className="table-container">
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th>Phone</th>
//             <th>Amount</th>
//             <th>Card Number</th>
//             <th>CVC</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((tx) => (
//             <tr key={tx._id}>
//               <td>{tx.phone}</td>
//               <td>{tx.amount}</td>
//               <td>{tx.cardNumber}</td>
//               <td>{tx.cvc}</td>
//               <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
//               <td>{new Date(tx.createdAt).toLocaleTimeString()}</td>
//               <td>{tx._id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TransactionTable;
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
            <th>Location</th>
            <th>Device Info</th>
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
              <td>
                {tx.location && tx.location.coordinates
                  ? `Lat: ${tx.location.coordinates[1]}, Long: ${tx.location.coordinates[0]}`
                  : 'N/A'}
              </td>
              <td>
                {tx.deviceInfo
                  ? `User Agent: ${tx.deviceInfo.userAgent}, IP: ${tx.deviceInfo.ip}, Language: ${tx.deviceInfo.language}`
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
