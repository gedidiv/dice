// DOM Elements
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");
const okBtn = document.getElementById("okBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const counterValue = document.querySelector(".counter-value");
const currentYearEl = document.getElementById("currentYear");

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// State variables
let count = 0;

// Function to open the modal with animation
function openModal() {
    modal.classList.remove("hidden");
    // Trigger reflow to ensure the transition works
    void modal.offsetWidth;
    modal.classList.add("visible");
    
    // Move focus to first focusable element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
        setTimeout(() => {
            focusableElements[0].focus();
        }, 100);
    }
    
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Function to close the modal with animation
function closeModal() {
    modal.classList.remove("visible");
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.classList.add("hidden");
        openModalBtn.focus(); // Return focus to the open button
    }, 300);
    
    document.body.style.overflow = ""; // Restore scrolling
}

// Helper function to get all focusable elements in the modal
function getFocusableElements() {
    return Array.from(modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));
}

// Toggle between light and dark theme
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    // Save theme preference
    const isDarkTheme = document.body.classList.contains("dark-theme");
    localStorage.setItem("darkTheme", isDarkTheme);
}

// Tab functionality
function switchTab(e) {
    const tabId = e.target.dataset.tab;
    
    // Remove active class from all tabs and panes
    tabBtns.forEach(btn => btn.classList.remove("active"));
    tabPanes.forEach(pane => pane.classList.remove("active"));
    
    // Add active class to clicked tab and corresponding pane
    e.target.classList.add("active");
    document.getElementById(tabId).classList.add("active");
}

// Counter functionality
function updateCounter(value) {
    count += value;
    counterValue.textContent = count;
    
    // Add animation effect
    counterValue.animate([
        { transform: 'scale(1.2)', color: value > 0 ? 'var(--success-color)' : 'red' },
        { transform: 'scale(1)', color: 'var(--highlight-color)' }
    ], {
        duration: 300,
        easing: 'ease-out'
    });
}

// Event listeners
openModalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
okBtn.addEventListener("click", closeModal);
toggleThemeBtn.addEventListener("click", toggleTheme);

// Tab event listeners
tabBtns.forEach(btn => {
    btn.addEventListener("click", switchTab);
});

// Counter event listeners
if (incrementBtn && decrementBtn) {
    incrementBtn.addEventListener("click", () => updateCounter(1));
    decrementBtn.addEventListener("click", () => updateCounter(-1));
}

// Close modal when clicking outside modal-content
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
function handleKeyboard(event) {
    // Close modal with Escape key
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
}

document.addEventListener("keydown", handleKeyboard);

// Trap focus within modal
modal.addEventListener("keydown", function(event) {
    if (event.key === "Tab" && !modal.classList.contains("hidden")) {
        const focusableElements = getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // If shift+tab on first element, move to last element
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } 
        // If tab on last element, move to first element
        else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});

// Check for saved theme preference
document.addEventListener("DOMContentLoaded", function() {
    const darkTheme = localStorage.getItem("darkTheme") === "true";
    if (darkTheme) {
        document.body.classList.add("dark-theme");
    }
});

// Add animation class to features on scroll
const featureItems = document.querySelectorAll('.feature-list li');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Set initial state and observe
featureItems.forEach((item, index) => {
    // Set initial state with staggered delay
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    observer.observe(item);
});