// script.js

// Load saved invoice data from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedInvoice = JSON.parse(localStorage.getItem("invoice")) || {};
    if (savedInvoice.items) {
      savedInvoice.items.forEach((item) => addItem(item));
      calculateTotal();
    }
    document.getElementById("invoice-number").value = savedInvoice.invoiceNumber || "TGH/0601";
    document.getElementById("invoice-date").value = savedInvoice.invoiceDate || "2020-07-19";
    document.getElementById("place-of-supply").value = savedInvoice.placeOfSupply || "West Bengal";
    document.getElementById("customer-name").value = savedInvoice.customerName || "Snigdha Panja";
    document.getElementById("customer-address").value = savedInvoice.customerAddress || "324 Diamond Harbour Road, Kolkata - 700009, West Bengal";
  });
  
  // Add a new item to the invoice table
  function addItem(item = {}) {
    const table = document.getElementById("invoice-table").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td><input type="text" value="${item.description || ""}" placeholder="Item Description"></td>
      <td><input type="number" value="${item.pcs || ""}" placeholder="PCS"></td>
      <td><input type="text" value="${item.purity || ""}" placeholder="Purity"></td>
      <td><input type="number" step="0.1" value="${item.weight || ""}" placeholder="Weight"></td>
      <td><input type="number" step="0.01" value="${item.rate || ""}" placeholder="Rate"></td>
      <td><input type="number" step="0.01" value="${item.amount || ""}" placeholder="Amount" readonly></td>
      <td><button onclick="deleteItem(this)">Delete</button></td>
    `;
    addEventListenersToInputs(newRow);
    calculateTotal();
  }
  
  // Add event listeners to inputs for dynamic calculation
  function addEventListenersToInputs(row) {
    const inputs = row.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const [description, pcs, purity, weight, rate, amount] = row.querySelectorAll("input");
        if (weight.value && rate.value) {
          amount.value = (weight.value * rate.value).toFixed(2);
        }
        calculateTotal();
      });
    });
  }
  
  // Delete an item from the invoice table
  function deleteItem(button) {
    const row = button.closest("tr");
    row.remove();
    calculateTotal();
  }
  
  // Calculate the total amount
  function calculateTotal() {
    const rows = document.querySelectorAll("#invoice-table tbody tr");
    let total = 0;
    rows.forEach((row) => {
      const amount = parseFloat(row.querySelector("input:nth-child(6)").value) || 0;
      total += amount;
    });
    document.getElementById("total-amount").textContent = total.toFixed(2);
    document.getElementById("amount-in-words").textContent = numberToWords(total);
    saveInvoice();
  }
  
  // Convert number to words
  function numberToWords(num) {
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    if (num === 0) return "Zero Only";
    let words = "";
    if (num >= 1000) {
      words += units[Math.floor(num / 1000)] + " Thousand ";
      num %= 1000;
    }
    if (num >= 100) {
      words += units[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    } else if (num >= 10) {
      words += teens[num - 10] + " ";
      num = 0;
    }
    if (num > 0) {
      words += units[num] + " ";
    }
    return words.trim() + " Only";
  }
  
  // Save invoice data to localStorage
  function saveInvoice() {
    const invoice = {
      invoiceNumber: document.getElementById("invoice-number").value,
      invoiceDate: document.getElementById("invoice-date").value,
      placeOfSupply: document.getElementById("place-of-supply").value,
      customerName: document.getElementById("customer-name").value,
      customerAddress: document.getElementById("customer-address").value,
      items: [],
    };
    document.querySelectorAll("#invoice-table tbody tr").forEach((row) => {
      const [description, pcs, purity, weight, rate, amount] = row.querySelectorAll("input");
      invoice.items.push({
        description: description.value,
        pcs: pcs.value,
        purity: purity.value,
        weight: weight.value,
        rate: rate.value,
        amount: amount.value,
      });
    });
    localStorage.setItem("invoice", JSON.stringify(invoice));
  }
  
  // Clear the invoice
  function clearInvoice() {
    localStorage.removeItem("invoice");
    document.getElementById("invoice-table").getElementsByTagName("tbody")[0].innerHTML = "";
    document.getElementById("total-amount").textContent = "0";
    document.getElementById("amount-in-words").textContent = "Zero Only";
  }
  
  // Print the invoice
  function printInvoice() {
    window.print();
  }