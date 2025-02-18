
        function loadFile(event) {
            const output = document.getElementById('profileImage');
            output.src = URL.createObjectURL(event.target.files[0]);
            output.onload = function() {
                URL.revokeObjectURL(output.src);
            }
        }
        document.getElementById('businessProfileForm').addEventListener('submit', function (event) {
            let isValid = true;
        
            // Validate Business Name
            const businessName = document.getElementById('businessName').value.trim();
            if (businessName.length < 2 || businessName.length > 100) {
                isValid = false;
                alert('Business Name must be between 2 and 100 characters.');
            }
        
            // Validate Owner's Name
            const ownerName = document.getElementById('ownerName').value.trim();
            if (ownerName.length < 2 || ownerName.length > 50) {
                isValid = false;
                alert('Owner\'s Name must be between 2 and 50 characters.');
            }
        
            // Validate GST Number
            const gst = document.getElementById('gst').value.trim();
            const gstPattern = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}Z\d{1}$/;
            if (!gstPattern.test(gst)) {
                isValid = false;
                alert('Enter a valid GST number (e.g., 12ABCDE1234F1Z5).');
            }
        
            // Validate Address
            const address = document.getElementById('address').value.trim();
            if (address.length < 5 || address.length > 200) {
                isValid = false;
                alert('Address must be between 5 and 200 characters.');
            }
        
            // Validate Mobile Number
            const phone = document.getElementById('phone').value.trim();
            const phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(phone)) {
                isValid = false;
                alert('Enter a valid 10-digit mobile number.');
            }
        
            // Validate Email
            const email = document.getElementById('email').value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                isValid = false;
                alert('Enter a valid email address.');
            }
        
            // Validate ID Type
            const idType = document.getElementById('idType').value;
            if (!idType) {
                isValid = false;
                alert('Please select an ID type.');
            }
        
            // Prevent form submission if validation fails
            if (!isValid) {
                event.preventDefault();
            }
        });