
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



let projects = [
    {
        name: "The Dog Spot",
        domain: "Web Development",
        img:"The Dog Spot",
        src:"assets/images/The dog spot.png"
    },
    {
        name: "Golf Club clone",
        domain: "Web Design",
        img:"Golf Club clone",
        src:"assets/images/The dog spot.png"
    },
    {
        name: "Golf Club clone",
        domain: "Web Design",
        img:"Golf Club clone",
        src:"assets/images/The dog spot.png"
    },
    {
        name: "Golf Club clone",
        domain: "Web Design",
        img:"Golf Club clone",
        src:"assets/images/The dog spot.png"
    },
    {
        name: "Golf Club clone",
        domain: "Web Design",
        img:"Golf Club clone",
        src:"assets/images/The dog spot.png"
    }
    
];


const projectsContainer = portfolio.querySelector("#tab-content-container");
console.log(projectsContainer);

for (let index = 0; index < projects.length; index++){
    const element = projects[index];
    console.log(index)
    //pass the project name

    let projectCard = `<div class="tab-content-card">
                  <img src='${projects[index].src}' alt="" />
                  <h4>${projects[index].name}</h4>
                  <p>${projects[index].domain} </p>
                </div>`

    projectsContainer.insertAdjacentHTML("beforeend", projectCard);



} //for loop end






    var galleryLinks = document.querySelectorAll('.gallery a');

    galleryLinks.forEach(function (link) {
        var bgElement = link.querySelector('.bg');
        var bgImage = window.getComputedStyle(bgElement).backgroundImage;
        console.log(bgImage);
        var imageUrl = bgImage.replace(/(url\(|\)|")/g, '');
        link.href = imageUrl;
    });

    Fancybox.bind("[data-fancybox]", {
        loop: true,
        buttons: [
            "zoom",
            "share",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ]
    });
