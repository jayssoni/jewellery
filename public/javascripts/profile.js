
        function loadFile(event) {
            const output = document.getElementById('profileImage');
            output.src = URL.createObjectURL(event.target.files[0]);
            output.onload = function() {
                URL.revokeObjectURL(output.src);
            }
        }
 

        document.addEventListener("DOMContentLoaded", function () {
            const flashMessage = document.getElementById("flash-message");
            if (flashMessage) {
                setTimeout(() => {
                    flashMessage.style.transition = "opacity 0.5s";
                    flashMessage.style.opacity = "0";
                    setTimeout(() => flashMessage.remove(), 500);
                }, 3000);
            }
        });
        
        