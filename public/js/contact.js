// JavaScript for the contact page

document.addEventListener('DOMContentLoaded', function () {
    // Function to handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Add your form submission logic here
            alert('Form submitted successfully!');
        });
    }
});
