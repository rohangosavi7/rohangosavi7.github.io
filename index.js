
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

const about = document.querySelector('.about-me');
const resume = document.querySelector('.resume');
const portfolio = document.querySelector('.portfolio');

document.addEventListener

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
    // Hide all sections
    document.querySelectorAll('section').forEach(function (section) {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}


emailjs.init("gRCm-pPJjXehPXPIs"); // Replace with your actual Email.js user ID

document.getElementById("myForm").onsubmit = function (event) {
    event.preventDefault();

    const formElement = document.getElementById("myForm");
    const formData = new FormData(formElement);

    emailjs.send("service_7z743xp", "template_ll3zogn", formData)
        .then(function (response) {
            console.log("Sent successfully:", response);
            alert("Sent successfully");
        }, function (error) {
            console.log("Failed to send:", error);
            alert("Something went wrong");
        });
};

