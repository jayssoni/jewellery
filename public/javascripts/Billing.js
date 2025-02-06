// Function to add a new item row
function addItem() {
  let table = document.getElementById("invoice-table").getElementsByTagName('tbody')[0];
  let newRow = table.insertRow();

  let cols = ["Item Description", "PCS", "Purity", "Weight (g)", "Rate (₹/g)", "Amount (₹)"];

  for (let i = 0; i < cols.length; i++) {
    let cell = newRow.insertCell(i);
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = cols[i];
    input.style.width = "90%";
    cell.appendChild(input);
  }
}

// Save Invoice Function
function saveInvoice() {
  alert("Invoice saved successfully!");
}

// Clear Invoice Function
function clearFields() {
  document.querySelectorAll(".invoice-details input").forEach(input => input.value = "");

  let tableBody = document.querySelector("#invoice-table tbody");
  tableBody.innerHTML = "";

  document.querySelector(".footer p strong").innerText = "Total Amount Payable: ₹ 0";
  document.querySelector(".footer p:nth-child(2)").innerText = "Amount in Words: Zero Only";
}

// Print Invoice Function
function printInvoice() {
  window.print();
}
