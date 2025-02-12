'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll(".form-input");
const formBtn = document.querySelector(".form-btn");

// Enable/Disable the submit button based on input validation
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// Initialize EmailJS
emailjs.init("4UfhDHYqL_Chd6HrB"); // Replace with your EmailJS Public Key

// Form submission using EmailJS
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  // Collect form data
  const formData = {
    to_name: "Subramanian V", // Your name
    from_name: document.querySelector("[name='fullname']").value,
    email: document.querySelector("[name='email']").value,
    message: document.querySelector("[name='message']").value
  };

  // Send email using EmailJS
  emailjs.send("service_nn6d9x7", "template_fb04z43", formData)
    .then(response => {
      alert("Message sent successfully! ✅");
      form.reset(); // Clear the form after successful submission
      formBtn.disabled = true; // Disable button again
    })
    .catch(error => {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. ❌ Please try again!");
    });
});

// Page navigation variables
const navigationLinks = document.querySelectorAll(".navbar-link");
const pages = document.querySelectorAll("article[data-page]");

// Add event listener to all navigation links
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetPage = this.innerText.toLowerCase().trim(); // Convert text to lowercase

    // Remove "active" class from all links and sections
    navigationLinks.forEach(nav => nav.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // Add "active" class to clicked link and target section
    this.classList.add("active");
    document.querySelector(`article[data-page="${targetPage}"]`).classList.add("active");

    window.scrollTo(0, 0); // Scroll to top when navigating
  });
});
