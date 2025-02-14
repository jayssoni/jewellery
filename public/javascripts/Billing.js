let currentFocusedRow;

document.addEventListener('focusin', function (e) {
  if (e.target && e.target.tagName === 'INPUT') {
    currentFocusedRow = e.target.closest('tr');
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
    currentFocusedRow.querySelectorAll('input').forEach(input => input.value = "");
    updateTotal();
  } else {
    document.querySelectorAll(".invoice-details input").forEach(input => input.value = "");
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
  document.querySelectorAll(".manual-amount").forEach(input => {
      total += parseFloat(input.value) || 0;
  });
  document.getElementById("total-amount").value = total.toFixed(2);
  updateOutstanding();
}

function updateOutstanding() {
  let totalAmount = parseFloat(document.getElementById("total-amount").value) || 0;
  let amountPaid = parseFloat(document.getElementById("amount-paid").value) || 0;
  let outstandingAmount = totalAmount - amountPaid;
  document.getElementById("outstanding-amount").innerText = outstandingAmount.toFixed(2);
  
  if (outstandingAmount <= 0) {
    document.getElementById("payment-status").innerText = "Paid";
  } else {
    document.getElementById("payment-status").innerText = "Pending";
  }
}

function saveInvoice() {
  let invoiceData = {
    invoiceNumber: document.getElementById("invoice-number").value,
    invoiceDate: document.getElementById("invoice-date").value,
    customerName: document.getElementById("customer-name").value,
    customerAddress: document.getElementById("customer-address").value,
    customerMobile: document.getElementById("customer-mobile").value,
    totalAmount: document.getElementById("total-amount").value,
    amountPaid: document.getElementById("amount-paid").value,
    outstandingAmount: document.getElementById("outstanding-amount").innerText,
    paymentStatus: document.getElementById("payment-status").innerText,
    items: []
  };

  document.querySelectorAll("#invoice-body tr").forEach(row => {
    let item = {
      description: row.children[0].children[0].value,
      pcs: row.children[1].children[0].value,
      purity: row.children[2].children[0].value,
      weight: row.children[3].children[0].value,
      rate: row.children[4].children[0].value,
      amount: row.children[5].children[0].value
    };
    invoiceData.items.push(item);
  });

  localStorage.setItem("savedInvoice", JSON.stringify(invoiceData));
  alert("Invoice saved successfully!");
}

function printInvoice() {
  window.print();
}