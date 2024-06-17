// JavaScript for the tournaments page

document.addEventListener('DOMContentLoaded', function () {
    // Function to handle registration button click
    const registerButtons = document.querySelectorAll('.register-button');
    registerButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const tournamentId = button.dataset.tournamentId;
            alert(`You have registered for tournament ID: ${tournamentId}`);
            // Add your registration logic here
        });
    });

    // Function to toggle tournament details on hover
    const tournaments = document.querySelectorAll('.tournament');
    tournaments.forEach(tournament => {
        tournament.addEventListener('mouseover', function () {
            const details = tournament.querySelector('.details');
            details.style.display = 'block';
        });
        tournament.addEventListener('mouseout', function () {
            const details = tournament.querySelector('.details');
            details.style.display = 'none';
        });
    });

    // Function to open the add tournament modal
    const addTournamentButton = document.querySelector('.add-tournament-button');
    const modalContainer = document.querySelector('.modal-container');
    const modalCloseButton = document.querySelector('.modal .close');
    
    if (addTournamentButton) {
        addTournamentButton.addEventListener('click', function () {
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
