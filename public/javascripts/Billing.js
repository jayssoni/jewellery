let currentFocusedRow;

document.addEventListener("focusin", function (e) {
  if (e.target && e.target.tagName === "INPUT") {
    currentFocusedRow = e.target.closest("tr");
  }
});

function addRow() {
  let table = document.getElementById("invoice-body");
  let row = document.createElement("tr");
  row.innerHTML = `
                <td><input type="text" oninput="updateAmount(this)"></td>
                <td><input type="number" value="1" oninput="updateAmount(this)"></td>
                <td><input type="text"></td>
                <td><input type="number" step="0.01" oninput="updateAmount(this)"></td>
                <td><input type="number" step="0.01" oninput="updateAmount(this)"></td>
                <td><input type="number" step="0.01" class="manual-amount" value="" oninput="updateTotal()"></td>
                <td><button class="delete-row" onclick="deleteRow(this)">Delete</button></td>
            `;
  table.appendChild(row);
  updateTotal();
}

function deleteRow(button) {
  button.parentElement.parentElement.remove();
  updateTotal();
}

function clearRowData() {
  if (currentFocusedRow) {
    currentFocusedRow
      .querySelectorAll("input")
      .forEach((input) => (input.value = ""));
    updateTotal();
  } else {
    document
      .querySelectorAll(".invoice-details input")
      .forEach((input) => (input.value = ""));
    document.getElementById("invoice-body").innerHTML = "";
    document.getElementById("total-amount").value = "0.00";
    document.getElementById("amount-in-words").innerText = "Zero Only";
    document.getElementById("amount-paid").value = "";
    document.getElementById("outstanding-amount").innerText = "0.00";
    document.getElementById("payment-status").innerText = "Pending";
  }
}

function updateTotal() {
  let total = 0;
  document.querySelectorAll(".manual-amount").forEach((input) => {
    total += parseFloat(input.value) || 0; // Fallback to 0
  });
  document.getElementById("total-amount").value = total.toFixed(2);
  updateOutstanding();
}


function updateOutstanding() {
  const totalAmount = parseFloat(document.getElementById("total-amount").value) || 0;
  const amountPaid = parseFloat(document.getElementById("amount-paid").value) || 0;
  const outstandingAmount = totalAmount - amountPaid;
  document.getElementById("outstanding-amount").innerText = outstandingAmount.toFixed(2);
  document.getElementById("payment-status").innerText = outstandingAmount <= 0 ? "Paid" : "Pending";
}


function saveInvoice(event) {
  event.preventDefault();
  let invoiceData = {
    invoiceNumber: document.getElementById("invoice-number").value,
    invoiceDate: document.getElementById("invoice-date").value,
    customerName: document.getElementById("customer-name").value,
    customerAddress: document.getElementById("customer-address").value,
    customerMobile: document.getElementById("customer-mobile").value,
    total: document.getElementById("total-amount").value,
    amountPaid: document.getElementById("amount-paid").value,
    outstandingAmount: document.getElementById("outstanding-amount").innerText,
    paymentStatus: document.getElementById("payment-status").innerText,
    items: [],
  }};

  document.querySelectorAll("#invoice-body tr").forEach((row) => {
    const description = row.children[0]?.children[0]?.value.trim();
    if (description) {
      invoiceData.items.push({
        description,
        pcs: row.children[1].children[0].value || "0",
        purity: row.children[2].children[0].value || "N/A",
        weight: row.children[3].children[0].value || "0",
        rate: row.children[4].children[0].value || "0",
        amount: row.children[5].children[0].value || "0",
      });
    }
  });
  console.log("Invoice Items:", invoiceData.items);

  // Send the invoice data to the backend
  fetch("/Billing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoiceData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      alert("Invoice saved successfully!");
      window.location.href = data.redirect;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to save the invoice. Please try again.");
    });
  
function printInvoice() {
  window.print();
}
function updateAmount(input) {
  const row = input.closest("tr");
  const pcs = parseFloat(row.querySelector("td:nth-child(2) input").value) || 1;
  const weight = parseFloat(row.querySelector("td:nth-child(4) input").value) || 0;
  const rate = parseFloat(row.querySelector("td:nth-child(5) input").value) || 0;
  const amount = pcs * weight * rate;
  row.querySelector("td:nth-child(6) input").value = amount.toFixed(2);
  updateTotal();
}
