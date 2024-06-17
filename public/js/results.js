// JavaScript for the results page

document.addEventListener('DOMContentLoaded', function () {
    // Function to handle result item hover effect
    const results = document.querySelectorAll('.result');
    results.forEach(result => {
        result.addEventListener('mouseover', function () {
            result.style.transform = 'scale(1.05)';
            result.style.transition = 'transform 0.3s ease';
        });
        result.addEventListener('mouseout', function () {
            result.style.transform = 'scale(1)';
            result.style.transition = 'transform 0.3s ease';
        });
    });

    // Function to handle adding results
    const addResultButton = document.querySelector('.add-result-button');
    const modalContainer = document.querySelector('.modal-container');
    const modalCloseButton = document.querySelector('.modal .close');
    
    if (addResultButton) {
        addResultButton.addEventListener('click', function () {
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
