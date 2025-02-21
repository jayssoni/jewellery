
        // Function to Show Invoice Details in Sidebar
        function showDetails(index, type) {
            let invoices = type === "Paid" ? <%- JSON.stringify(paidInvoices) %> : <%- JSON.stringify(pendingInvoices) %>;
            let invoice = invoices[index];

            let detailsHTML = `
                <p><strong>Invoice No:</strong> ${invoice.invoiceNumber}</p>
                <p><strong>Name:</strong> ${invoice.customerName}</p>
                <p><strong>Date:</strong> ${new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                <p><strong>Address:</strong> ${invoice.customerAddress}</p>
                <p><strong>Total:</strong> ₹${invoice.total.toFixed(2)}</p>
                <p><strong>Paid:</strong> ₹${invoice.amountPaid.toFixed(2)}</p>
                ${type === "Pending" ? `<p><strong>Due:</strong> ₹${invoice.outstandingAmount.toFixed(2)}</p>` : ""}
                <h4>🛒 Items Purchased:</h4>
                <ul>
                    ${invoice.items.map(item => `
                        <li>
                            <p><strong>Description:</strong> ${item.description}</p>
                            <p><strong>Pcs:</strong> ${item.pcs} | <strong>Purity:</strong> ${item.purity}</p>
                            <p><strong>Weight:</strong> ${item.weight} g | <strong>Rate:</strong> ₹${item.rate} per g</p>
                            <p><strong>Amount:</strong> ₹${item.amount}</p>
                        </li>
                    `).join('')}
                </ul>
            `;

            document.getElementById("invoiceDetails").innerHTML = detailsHTML;
            document.getElementById("invoiceSidebar").style.width = "350px";
        }

        // Function to Close Sidebar
        function closeSidebar() {
            document.getElementById("invoiceSidebar").style.width = "0";
        }

        // Search Functionality
        document.getElementById("searchInvoice").addEventListener("input", function () {
            const searchTerm = this.value.toLowerCase();
            const invoiceCards = document.querySelectorAll(".invoice-card");

            invoiceCards.forEach(card => {
                const invoiceNumber = card.querySelector(".invoice-number").textContent.toLowerCase();
                if (invoiceNumber.includes(searchTerm)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
  