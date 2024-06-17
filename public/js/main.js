// Main JavaScript file

// Function to handle navigation bar interaction
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function () {
            link.style.transform = 'scale(1.1)';
        });
        link.addEventListener('mouseout', function () {
            link.style.transform = 'scale(1)';
        });
    });

    // Social media icons animation
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', function () {
            icon.style.transform = 'rotate(15deg) scale(1.1)';
        });
        icon.addEventListener('mouseout', function () {
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });

    // Auto logout after 15 minutes of inactivity
    let timer;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer; // catches touchpad clicks
    window.onkeypress = resetTimer;

    function logout() {
        alert('You have been logged out due to inactivity.');
        window.location.href = '/logout'; // Adjust the logout URL accordingly
    }

    function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(logout, 900000); // 15 minutes in milliseconds
    }
});
