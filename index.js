const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

const about = document.querySelector('.about-me');
const resume = document.querySelector('.resume');
const portfolio = document.querySelector('.portfolio');

document.addEventListener('DOMContentLoaded', () => {
    // Hide all sections first
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show about section by default
    showSection('about');
    
    // Add active class to "About" link
    const aboutLink = document.querySelector('.header a[href="#about"]');
    if (aboutLink) {
        aboutLink.classList.add('active');
    }

    // Profile toggle functionality
    const profileToggleBtn = document.querySelector('.profile-toggle-btn');
    const mainCol1 = document.querySelector('.main-col1');
    const toggleIcon = profileToggleBtn.querySelector('i');

    if (profileToggleBtn && mainCol1) {
        // Initially collapse the profile on mobile
        if (window.innerWidth <= 768) {
            mainCol1.classList.add('collapsed');
            toggleIcon.classList.replace('ph-caret-up', 'ph-caret-down');
        }

        profileToggleBtn.addEventListener('click', () => {
            mainCol1.classList.toggle('collapsed');
            
            // Toggle icon
            if (mainCol1.classList.contains('collapsed')) {
                toggleIcon.classList.replace('ph-caret-up', 'ph-caret-down');
            } else {
                toggleIcon.classList.replace('ph-caret-down', 'ph-caret-up');
            }
        });

        // Auto-collapse profile when switching sections on mobile
        document.querySelectorAll('.header a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainCol1.classList.add('collapsed');
                    toggleIcon.classList.replace('ph-caret-up', 'ph-caret-down');
                }
            });
        });
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        target.classList.add('active')
    })
})

function showSection(sectionId) {
    console.log('Showing section:', sectionId); // Debug log
    
    const selectedSection = document.getElementById(sectionId);
    
    // Check if section exists
    if (!selectedSection) {
        console.error(`Section with id "${sectionId}" not found`);
        return;
    }

    // Hide all sections first
    document.querySelectorAll('section').forEach(function (section) {
        if (section) {
            section.style.display = 'none';
            section.classList.remove('active');
        }
    });

    // Show and animate the selected section
    selectedSection.style.display = 'block';
    
    // Trigger reflow
    selectedSection.offsetHeight;
    
    // Add active class for animation
    setTimeout(() => {
        selectedSection.classList.add('active');
    }, 10);
}

// Animate skill bars when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            const percentage = progressBar.parentElement.previousElementSibling.querySelector('span').textContent;
            progressBar.style.setProperty('--progress', percentage);
            progressBar.style.width = percentage;
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-bar').forEach(bar => {
    observer.observe(bar);
});

// Smooth scroll for navigation with error handling
document.querySelectorAll('.header a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the section ID from href attribute
        const href = link.getAttribute('href');
        const targetId = href ? href.replace('#', '') : null;
        
        console.log('Clicked link for section:', targetId); // Debug log
        
        // Only proceed if targetId exists
        if (targetId) {
            showSection(targetId);
            
            // Add active state to navigation
            document.querySelectorAll('.header a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Add hover effect for cards
document.querySelectorAll('.cards-child').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('img');
        if (icon) {
            icon.style.transform = 'rotate(10deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', (e) => {
        const icon = card.querySelector('img');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
        }
    });
});

// Email.js initialization and form handling
if (typeof emailjs !== 'undefined') {
    emailjs.init("gRCm-pPJjXehPXPIs");
}

const form = document.getElementById("myForm");
if (form) {
    form.onsubmit = function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        emailjs.send("service_7z743xp", "template_ll3zogn", Object.fromEntries(formData))
            .then(function (response) {
                console.log("Sent successfully:", response);
                alert("Message sent successfully!");
            }, function (error) {
                console.log("Failed to send:", error);
                alert("Failed to send message. Please try again.");
            });
    };
}

// Project data
const projectsData = {
    aiinvoicer: {
        title: "AI Invoicer",
        description: "A MERN stack application that helps businesses create and manage invoices using AI technology. Features include automated invoice generation, client management, and payment tracking.",
        images: ["assets/images/AI-invoicer1.png", "assets/images/AI-invoicer2.png"],
        technologies: "React.js, Node.js, Firebase, Express.js, OpenAI, Tailwind CSS, Google Cloud",
        category: "Full Stack Application",
        completed: "March 2024",
        link: "https://app.aiinvoicer.in",
        github: "https://github.com/rohangosavi7/ai-invoicer"
    },
    dogspot: {
        title: "The Dog Spot",
        description: "A comprehensive platform for dog owners featuring pet care services, appointment booking, and community features.",
        images: ["assets/images/the-dog-spot.png"],
        technologies: "HTML, CSS, JavaScript, PHP, MySQL, Bootstrap",
        video: "assets/videos/The Dog Spot Demo.mp4",
        category: "Web Application",
        completed: "February 2024",
        link: "https://dogspot.vercel.app/",
        github: "https://github.com/rohangosavi7/thedogspot"
    },
    chatapp: {
        title: "Realtime Chat Application",
        description: "A real-time chat application built with Socket.IO and Node.js, featuring instant messaging, room creation, and user presence indicators.",
        images: ["assets/images/project-1.jpg"],
        technologies: "Socket.IO, Node.js, Express.js",
        category: "Real-time Application",
        completed: "January 2024",
        link: "#",
        github: "https://github.com/rohangosavi7/CodeClauseInternship_chat-app"
    },
    musicplayer: {
        title: "Music Player",
        description: "A JavaScript-based music player with features like playlist management, shuffle play, and visualizations.",
        images: ["assets/images/project-1.jpg"],
        technologies: "HTML, CSS, JavaScript",
        category: "Frontend Application",
        completed: "December 2023",
        link: "https://rgmusic-player.vercel.app/",
        github: "https://github.com/rohangosavi7/CodeClauseInternship_music_player"
    },
    webifyx: {
        title: "Webifyx Landing Page",
        description: "A modern and responsive landing page built with HTML, CSS, and JavaScript, featuring smooth animations and interactive elements.",
        images: ["assets/images/project-1.jpg"],
        technologies: "HTML, CSS, JavaScript, Bootstrap",
        category: "Landing Page",
        completed: "November 2023",
        link: "https://webifyx.vercel.app/",
        github: "https://github.com/rohangosavi7/webifyx"
    }
};

// Enhanced modal functionality
const modal = document.querySelector('.project-modal');
const modalContent = modal.querySelector('.modal-content');
const modalTitle = modal.querySelector('h3');
const modalDescription = modal.querySelector('p');
const modalTechnologies = modal.querySelector('.technologies');
const modalCategory = modal.querySelector('.category');
const modalCompleted = modal.querySelector('.completed');
const modalLinks = modal.querySelector('.project-links');
const sliderContainer = modal.querySelector('.slider-container');
const sliderNav = modal.querySelector('.slider-nav');
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function createSlider(images, video) {
    sliderContainer.innerHTML = '';
    sliderNav.innerHTML = '';
    
    // Add video slide first if video exists
    if (video) {
        const videoSlide = document.createElement('div');
        videoSlide.className = 'slider-slide';
        videoSlide.innerHTML = `
            <video controls class="project-video">
                <source src="${video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        sliderContainer.appendChild(videoSlide);
        
        // Create navigation dot for video
        const videoDot = document.createElement('div');
        videoDot.className = 'slider-dot';
        videoDot.innerHTML = '<i class="ph ph-play"></i>';
        videoDot.addEventListener('click', () => {
            currentSlide = 0;
            showSlide(currentSlide);
        });
        sliderNav.appendChild(videoDot);
    }
    
    // Add image slides
    images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        slide.innerHTML = `<img src="${img}" alt="Project screenshot ${index + 1}">`;
        sliderContainer.appendChild(slide);
        
        // Create navigation dots for images
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        dot.addEventListener('click', () => {
            currentSlide = video ? index + 1 : index;
            showSlide(currentSlide);
        });
        sliderNav.appendChild(dot);
    });
    
    currentSlide = 0;
    showSlide(0);
}

document.querySelectorAll('.tab-content-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const project = projectsData[projectId];
        
        if (!project) {
            console.error(`Project data not found for project ID: ${projectId}`);
            return;
        }
        
        createSlider(project.images, project.video);
        
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalTechnologies.textContent = project.technologies;
        modalCategory.textContent = project.category;
        // modalCompleted.textContent = project.completed;
        
        modalLinks.innerHTML = `
            <a href="${project.link}" target="_blank">
                <i class="ph ph-link"></i> Live Demo
            </a>
            <a href="${project.github}" target="_blank">
                <i class="ph ph-github-logo"></i> Source Code
            </a>
        `;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
            modalContent.classList.add('active');
        }, 10);
    });
});

// Slider navigation buttons
modal.querySelector('.prev').addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

modal.querySelector('.next').addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    modalContent.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

document.querySelector('.close-modal').addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') {
        currentSlide--;
        showSlide(currentSlide);
    }
    if (e.key === 'ArrowRight') {
        currentSlide++;
        showSlide(currentSlide);
    }
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.tab-content-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.dataset.filter;
        
        projectCards.forEach(card => {
            // Reset animation
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = null;
            
            if (filterValue === 'all' || card.dataset.category === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add stagger effect to initial load
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('.submit-button');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add loading state
    submitButton.classList.add('loading');
    submitButton.innerHTML = '<span>Sending...</span>';
    
    // Simulate form submission (replace with your actual form handling logic)
    try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        
        // Success state
        submitButton.innerHTML = '<i class="ph ph-check"></i>Sent Successfully';
        submitButton.style.background = 'rgba(22, 163, 74, 0.3)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.innerHTML = '<i class="ph ph-paper-plane-right"></i>Send Message';
            submitButton.style.background = '';
        }, 3000);
        
    } catch (error) {
        // Error state
        submitButton.innerHTML = '<i class="ph ph-x"></i>Failed to Send';
        submitButton.style.background = 'rgba(220, 38, 38, 0.3)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.innerHTML = '<i class="ph ph-paper-plane-right"></i>Send Message';
            submitButton.style.background = '';
        }, 3000);
    }
});
