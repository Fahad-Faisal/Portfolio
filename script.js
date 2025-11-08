function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
document.addEventListener('DOMContentLoaded', function() {
    // Generate random numbers for CAPTCHA
    let num1, num2, correctAnswer;
    
    function generateCaptcha() {
        // Generate random numbers between 1 and 10
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        
        // Display the CAPTCHA question
        document.getElementById('captchaQuestion').textContent = `${num1} + ${num2}`;
    }
    
    // Initialize CAPTCHA when page loads
    generateCaptcha();
    
    // Form submission handler
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get CAPTCHA input value
        const userAnswer = document.getElementById('captcha').value.trim();
        const captchaError = document.getElementById('captchaError');
        
        // Validate CAPTCHA
        if (userAnswer === '') {
            captchaError.textContent = 'Please solve the CAPTCHA';
            return;
        }
        
        if (parseInt(userAnswer) !== correctAnswer) {
            captchaError.textContent = 'Incorrect answer. Please try again.';
            generateCaptcha(); // Generate new CAPTCHA
            document.getElementById('captcha').value = ''; // Clear input
            return;
        }
        
        // If CAPTCHA is correct, submit the form
        captchaError.textContent = '';
        
        // You can submit the form programmatically
        this.submit();
    });
    
    // Optional: Add real-time validation for better UX
    document.getElementById('captcha').addEventListener('input', function() {
        const userAnswer = this.value.trim();
        const captchaError = document.getElementById('captchaError');
        
        if (userAnswer && parseInt(userAnswer) === correctAnswer) {
            captchaError.textContent = '';
            captchaError.style.color = 'green';
            captchaError.textContent = '✓ Correct!';
        } else if (userAnswer) {
            captchaError.style.color = 'red';
        }
    });
    
    // Optional: Add a refresh CAPTCHA button
    const refreshButton = document.createElement('button');
    refreshButton.type = 'button';
    refreshButton.textContent = 'Refresh CAPTCHA';
    refreshButton.className = 'refresh-captcha-btn';
    refreshButton.addEventListener('click', function() {
        generateCaptcha();
        document.getElementById('captcha').value = '';
        document.getElementById('captchaError').textContent = '';
    });
    
    // Add refresh button after CAPTCHA input
    document.querySelector('.captcha-container').appendChild(refreshButton);
});