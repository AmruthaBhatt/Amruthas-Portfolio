// ===== Sample Projects Data =====
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce website built with Node.js and MongoDB. Features include product catalog, shopping cart, order management, and payment integration.",
        link: "#"
    },
    {
        id: 2,
        title: "Real-time Chat Application",
        description: "A web-based chat application using Socket.io and Express.js. Supports real-time messaging, user authentication, and typing indicators.",
        link: "#"
    },
    {
        id: 3,
        title: "Task Management System",
        description: "A collaborative task management tool built with React and Firebase. Users can create projects, assign tasks, and track progress in real-time.",
        link: "#"
    },
    {
        id: 4,
        title: "Weather Dashboard",
        description: "A responsive weather application using OpenWeatherMap API. Displays current weather, forecast, and weather alerts for multiple locations.",
        link: "#"
    },
    {
        id: 5,
        title: "Blog Platform",
        description: "A content management system for blogging built with Node.js and PostgreSQL. Features include markdown support, categories, tags, and comments.",
        link: "#"
    },
    {
        id: 6,
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website showcasing projects and skills. Built with vanilla JavaScript, CSS3, and optimized for all devices.",
        link: "#"
    }
];

// ===== Smooth Scrolling Function =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    setupContactForm();
    setupSmoothScrolling();
});

// ===== Display Projects =====
function displayProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = '<p class="loading">No projects found.</p>';
        return;
    }
    
    projectsContainer.innerHTML = '';
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <div class="project-card-content">
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.description)}</p>
                <a href="${escapeHtml(project.link)}" target="_blank" class="project-link">View Project</a>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// ===== Setup Contact Form =====
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// ===== Handle Contact Form Submission =====
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    const messageDiv = document.getElementById('form-message');
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !message) {
        showMessage('Please fill out all fields.', 'error', messageDiv, submitButton);
        return;
    }
    
    // Simulate sending (in production, you'd send to a backend)
    setTimeout(() => {
        // Show success message
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon!';
        
        // Reset form
        form.reset();
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }, 500);
}

// ===== Show Message Helper =====
function showMessage(text, type, messageDiv, submitButton) {
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// ===== Setup Smooth Scrolling for Navigation Links =====
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href') ? link.getAttribute('href').substring(1) : '';
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

// ===== Utility Function: Escape HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
