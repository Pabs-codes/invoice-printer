// // script.js

// let totalAmount = 0;

// function addRow() {
//     const tableBody = document.getElementById('invoice-items');
//     const newRow = document.createElement('tr');

//     newRow.innerHTML = `
//         <td><input type="text" placeholder="Item Description" /></td>
//         <td><input type="number" placeholder="Rate" oninput="updateTotal()" /></td>
//         <td><input type="number" placeholder="Qty" oninput="updateTotal()" /></td>
//         <td class="amount">0.00</td>
//     `;

//     tableBody.appendChild(newRow);
// }

// function updateTotal() {
//     const rows = document.querySelectorAll('#invoice-items tr');
//     totalAmount = 0;

//     rows.forEach(row => {
//         const rateInput = row.querySelector('input[type="number"]:nth-child(2)');
//         const qtyInput = row.querySelector('input[type="number"]:nth-child(3)');
//         const amountCell = row.querySelector('.amount');

//         const rate = parseFloat(rateInput.value) || 0;
//         const qty = parseFloat(qtyInput.value) || 0;
//         const amount = rate * qty;

//         amountCell.textContent = amount.toFixed(2);
//         totalAmount += amount;
//     });

//     document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
// }

// function generatePDF() {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     doc.text("Invoice", 20, 20);
//     doc.text(`Total Amount: ${totalAmount.toFixed(2)}`, 20, 30);

//     doc.save('invoice.pdf');
// }


