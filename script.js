function addRow() {
    const table = document.getElementById("invoice-items");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" class="description"></td>
        <td><input type="number" class="rate" oninput="calculateAmount(this)"></td>
        <td><input type="number" class="qty" oninput="calculateAmount(this)"></td>
        <td class="amount">0.00</td>
    `;
    table.appendChild(row);
}

function calculateAmount(element) {
    const row = element.parentElement.parentElement;
    const rate = parseFloat(row.querySelector(".rate").value) || 0;
    const qty = parseFloat(row.querySelector(".qty").value) || 0;
    const amount = rate * qty;
    row.querySelector(".amount").innerText = amount.toFixed(2);

    updateTotal();
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll(".amount").forEach(cell => {
        total += parseFloat(cell.innerText) || 0;
    });
    document.getElementById("total-amount").innerText = total.toFixed(2);
}
function generatePDF() {
    const { jsPDF } = window.jspdf;

    // Convert input fields to text for PDF rendering
    document.querySelectorAll("input").forEach(input => {
        const text = document.createElement("span");
        text.className = input.className;
        text.innerText = input.value || ""; // Preserve input value as text
        input.parentNode.replaceChild(text, input);
    });

    // Hide buttons for PDF
    document.querySelectorAll(".no-print").forEach(el => el.style.display = "none");

    // Create PDF instance
    const pdf = new jsPDF("p", "mm", "a5");

    html2canvas(document.querySelector(".invoice-container"), { scale: 3 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        const pdfWidth = 148;
        const pdfHeight = 210;
        const maxContentHeight = pdfHeight - 30;

        let pdfImgWidth = pdfWidth;
        let pdfImgHeight = (canvas.height * pdfWidth) / canvas.width;
        if (pdfImgHeight > maxContentHeight) {
            pdfImgHeight = maxContentHeight;
            pdfImgWidth = (canvas.width * maxContentHeight) / canvas.height;
        }

        const offsetX = (pdfWidth - pdfImgWidth) / 2;
        pdf.addImage(imgData, "PNG", offsetX, 10, pdfImgWidth, pdfImgHeight);

        const footerText = "Thank you for your business! If you have any questions, please contact us at lionsteel.com@gmail.com.";
        pdf.setFontSize(8);
        const footerY = pdfHeight - 15;
        pdf.text(footerText, 10, footerY, { maxWidth: pdfWidth - 20 });

        pdf.save("invoice_a5.pdf");

        // Restore input fields after PDF generation
        document.querySelectorAll("span").forEach(span => {
            const input = document.createElement("input");
            input.type = span.id === "invoice-date" ? "date" : "text";
            input.className = span.className;
            input.value = span.innerText;
            span.parentNode.replaceChild(input, span);
        });

        // Restore button visibility after PDF generation
        document.querySelectorAll(".no-print").forEach(el => el.style.display = "block");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Set today's date as the default value for the date input
    const dateInput = document.getElementById("invoice-date");
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    dateInput.value = today; // Set the value of the date input to today's date
});

