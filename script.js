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


// // preloader

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

// //list as many as you'd like
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


let navMobile = document.querySelector('.nav-links-mobile');
let menuBtn = document.querySelector('.menu-btn');
let navLink = document.querySelectorAll('.nav-link');

function toggleMenu(){
    console.log(navMobile.classList);
    navMobile.classList.toggle('active');
}

function clickPage(){
    navMobile.classList.remove('active');
}

// horizontal scroll animation
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}


const body = document.body;

const MathUtils = {
  lineEq: (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    var m = (y2 - y1) / (x2 - x1),
      b = y1 - m * x1;
    return m * currentVal + b;
  },
  lerp: (a, b, n) => (1 - n) * a + n * b,
  getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
};

const getMousePos = e => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy };
};

let winsize;
const calcWinsize = () =>
  (winsize = { width: window.innerWidth, height: window.innerHeight });
calcWinsize();
window.addEventListener("resize", calcWinsize);

let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
window.addEventListener("mousemove", ev => (mousepos = getMousePos(ev)));

// Custom cursor
class Cursor {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.circle = this.DOM.el.querySelector(".js-cursor-inner");
    this.DOM.arrows = {
      right: this.DOM.el.querySelector(".js-cursor-right"),
      left: this.DOM.el.querySelector(".js-cursor-left")
    };
    this.bounds = this.DOM.circle.getBoundingClientRect();
    this.lastMousePos = { x: 0, y: 0 };
    this.scale = 1;
    this.lastScale = 1;
    requestAnimationFrame(() => this.render());
  }
  render() {
    this.lastMousePos.x = MathUtils.lerp(
      this.lastMousePos.x,
      mousepos.x - this.bounds.width / 2,
      0.2
    );
    this.lastMousePos.y = MathUtils.lerp(
      this.lastMousePos.y,
      mousepos.y - this.bounds.height / 2,
      0.2
    );
    this.lastScale = MathUtils.lerp(this.lastScale, this.scale, 0.15);
    this.DOM.circle.style.transform = `translateX(${
      this.lastMousePos.x
    }px) translateY(${this.lastMousePos.y}px) scale(${this.lastScale})`;
    requestAnimationFrame(() => this.render());
  }
  enter() {
    this.scale = 1.9;
  }
  leave() {
    this.scale = 1;
  }
  click() {
    this.lastScale = 0.4;
  }
  showArrows() {
    TweenMax.to(Object.values(this.DOM.arrows), 1, {
      ease: Expo.easeOut,
      startAt: { x: i => (i ? 10 : -10) },
      opacity: 1,
      x: 0
    });
  }
  hideArrows() {
    TweenMax.to(Object.values(this.DOM.arrows), 1, {
      ease: Expo.easeOut,
      x: i => (i ? 10 : -10),
      opacity: 0
    });
  }
}

// Custom mouse cursor
const cursor = new Cursor(document.querySelector(".js-cursor"));

// Activate the enter/leave/click methods of the custom cursor when hovering in/out on every <a> (and the close content ctrl)
const links = document.querySelectorAll(".js-link");

[...links].forEach(link => {
    link.addEventListener("mouseenter", () => cursor.enter());
    link.addEventListener("mouseleave", () => cursor.leave());
  });




//   sticky button
class HoverButton {
    constructor(el) {
      this.el = el;
      this.hover = false;
      this.calculatePosition();
      this.attachEventsListener();
    }
    attachEventsListener() {
      window.addEventListener('mousemove', e => this.onMouseMove(e));
      window.addEventListener('resize', e => this.calculatePosition(e));
    }
    calculatePosition() {
      gsap.set(this.el, {
        x: 0,
        y: 0,
        scale: 1
      });
      const box = this.el.getBoundingClientRect();
      this.x = box.left + box.width * 0.5;
      this.y = box.top + box.height * 0.5;
      this.width = box.width;
      this.height = box.height;
    }
    onMouseMove(e) {
      let hover = false;
      let hoverArea = this.hover ? 0.7 : 0.5;
      let x = e.clientX - this.x;
      let y = e.clientY - this.y;
      let distance = Math.sqrt(x * x + y * y);
      if (distance < this.width * hoverArea) {
        hover = true;
        if (!this.hover) {
          this.hover = true;
        }
        this.onHover(e.clientX, e.clientY);
      }
      if (!hover && this.hover) {
        this.onLeave();
        this.hover = false;
      }
    }
    onHover(x, y) {
      gsap.to(this.el, {
        x: (x - this.x) * 0.2,
        y: (y - this.y) * 0.2,
        scale: 1.05,
        ease: 'power2.out',
        duration: 0.4
      });
      this.el.style.zIndex = 10;
    }
    onLeave() {
      gsap.to(this.el, {
        x: 0,
        y: 0,
        scale: 1,
        ease: 'elastic.out(1.2, 0.4)',
        duration: 0.7
      });
      this.el.style.zIndex = 1;
    }
  }
  const btn1 = document.querySelector('.hero-btn');
  new HoverButton(btn1);


  // canvas animation code

let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
const dots = [];
const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
for (let index = 0; index < 40; index++) {
    dots.push({
        x:  Math.floor(Math.random() * canvas.width),
        y:  Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random()* 5)]
    });
}
const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        ctx.fill();
    })
}

drawDots();
body.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x:  event.pageX - banner.getBoundingClientRect().left,
        y:  event.pageY - banner.getBoundingClientRect().top
    }
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if(distance < 300){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
})
banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
})
window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;

    dots = [];
    for (let index = 0; index < 50; index++) {
        dots.push({
            x:  Math.floor(Math.random() * canvas.width),
            y:  Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random()* 5)]
        });
    }
    drawDots();
})
