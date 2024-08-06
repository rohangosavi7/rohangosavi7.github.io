document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    links.forEach(link => {
        link.addEventListener('click', (e) => {

            // Remove active class from all links
            links.forEach(link => link.classList.remove('active'));

            // Add active class to the clicked link
            link.classList.add('active');

            // Get the page ID from data attribute
            const pageId = link.getAttribute('data-page');

            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            // Show the selected page
            document.getElementById(pageId).classList.add('active');




        });


    });
});



const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });


});



let contactConfirm = document.querySelector('.contact-confirm')

function displayConfirm() {
    contactConfirm.classList.toggle("visible");
    console.log(contactConfirm);
}


// preloader

// Random stop between 30% and 80%

let randomStop = Math.random() * (0.8 - 0.3) + 0.3;

let tl = gsap.timeline();

tl.to(".text", {
    duration: 2,
    text: "Rohan Gosavi"
})
    .from(".pr-progress-bar", {
        duration: 0.5,
        opacity: 0
    })
    .to(".pr-progress", {
        duration: 1,
        width: `${randomStop * 50}%`
    })
    .to(".pr-progress", {
        duration: 1 - randomStop,
        width: "100%"
    })
    .to(".text, .pr-progress-bar", {
        duration: 0.5,
        opacity: 0
    })
    .to(".pr-preloader", {
        duration: 0.5,
        height: 0,
        onComplete: () => {
            gsap.to(document.querySelector(".preloader"), { x: 200 });
            document.querySelector(".preloader").style.display = "none";
        }
    });

//list as many as you'd like
gsap.registerPlugin(ScrollTrigger);


const page = document.querySelectorAll(".page");

page.forEach((element) => {
    gsap.from(element, {
        opacity:0,
        x: 100,
        delay: 6,
        duration: 2,
        ease: "sine.inOut",
        autoAlpha: 0,
        scrollTrigger: {
            trigger: element
        }
    });
})

tl.from(".header", {
    opacity:0,
    x: -100,
    delay: 0.5,
    duration: 2,
    ease: "sine.inOut",
    autoAlpha: 0,
})