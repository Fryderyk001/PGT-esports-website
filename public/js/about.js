// JavaScript for the about page

document.addEventListener('DOMContentLoaded', function () {
    // Example function to handle a button click event
    const moreInfoButton = document.querySelector('.more-info-button');
    if (moreInfoButton) {
        moreInfoButton.addEventListener('click', function () {
            alert('More information coming soon!');
        });
    }

    // Function to handle hover effect on team member profiles
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseover', function () {
            member.style.transform = 'scale(1.05)';
            member.style.transition = 'transform 0.3s ease';
        });
        member.addEventListener('mouseout', function () {
            member.style.transform = 'scale(1)';
            member.style.transition = 'transform 0.3s ease';
        });
    });
});
