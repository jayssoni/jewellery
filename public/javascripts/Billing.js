
        let currentFocusedRow;

        document.addEventListener('focusin', function(e) {
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
                document.getElementById("total-amount").innerText = "0.00";
                document.getElementById("amount-in-words").innerText = "Zero Only";
            }
        }

        function updateAmount(input) {
            let row = input.parentElement.parentElement;
            let pcs = parseFloat(row.children[1].children[0].value) || 0;
            let weight = parseFloat(row.children[3].children[0].value) || 0;
            let rate = parseFloat(row.children[4].children[0].value) || 0;
            let amountInput = row.children[5].children[0];
            let amount = pcs * weight * rate;
            amountInput.value = amount ? amount.toFixed(2) : "";
            updateTotal();
        }

        function updateTotal() {
            let total = 0;
            document.querySelectorAll(".manual-amount").forEach(input => {
                total += parseFloat(input.value) || 0;
            });
            document.getElementById("total-amount").innerText = total.toFixed(2);
        }

        function saveInvoice() {
            let invoiceData = {
                invoiceNumber: document.getElementById("invoice-number").value,
                invoiceDate: document.getElementById("invoice-date").value,
                customerName: document.getElementById("customer-name").value,
                customerAddress: document.getElementById("customer-address").value,
                customerMobile: document.getElementById("customer-mobile").value,
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
    