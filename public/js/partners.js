// JavaScript for the partners page

document.addEventListener('DOMContentLoaded', function () {
    // Function to handle partner item hover effect
    const partners = document.querySelectorAll('.partner');
    partners.forEach(partner => {
        partner.addEventListener('mouseover', function () {
            partner.style.transform = 'translateY(-10px)';
            partner.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
            partner.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        partner.addEventListener('mouseout', function () {
            partner.style.transform = 'translateY(0)';
            partner.style.boxShadow = 'none';
            partner.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // Function to handle adding partners
    const addPartnerButton = document.querySelector('.add-partner-button');
    const modalContainer = document.querySelector('.modal-container');
    const modalCloseButton = document.querySelector('.modal .close');
    
    if (addPartnerButton) {
        addPartnerButton.addEventListener('click', function () {
            modalContainer.style.display = 'flex';
        });
    }

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', function () {
            modalContainer.style.display = 'none';
        });
    }

    // Close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
});
