// ===== API Configuration =====
const API_URL = 'http://localhost:3000/api';

// ===== Smooth Scrolling Function =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Fetch Projects on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    setupContactForm();
    setupSmoothScrolling();
});

// ===== Fetch Projects from Backend =====
async function fetchProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
    }
}

// ===== Display Projects =====
function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    
    // Clear previous content
    projectsContainer.innerHTML = '';
    
    // Check if projects exist
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p class="loading">No projects found yet.</p>';
        return;
    }
    
    // Create project cards
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
    form.addEventListener('submit', handleFormSubmit);
}

// ===== Handle Contact Form Submission =====
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    const messageDiv = document.getElementById('form-message');
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Show success message
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'Thank you! Your message has been sent successfully.';
        
        // Reset form
        form.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Failed to send message. Please try again later.';
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}

// ===== Setup Smooth Scrolling for Navigation Links =====
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// ===== Utility Function: Escape HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Animation for Project Cards =====
document.addEventListener('animationend', (e) => {
    if (e.animationName === 'slideInUp') {
        // Animation completed
    }
});
