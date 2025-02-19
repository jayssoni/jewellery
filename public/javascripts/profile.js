
function loadFile(event) {
    const output = document.getElementById('profileImage');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('businessProfileForm');
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (input.checkValidity()) {
                input.nextElementSibling.style.display = 'none'; // Hide error message
            } else {
                input.nextElementSibling.style.display = 'block'; // Show error message
            }
        });
    });

    form.addEventListener('submit', function (event) {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.nextElementSibling.style.display = 'block'; // Show error message
            }
        });

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});