
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click',() =>{
     const target = document.querySelector(tab.dataset.tabTarget) 
     tabContents.forEach(tabContent => {
        tabContent.classList.remove('active')
    })
     target.classList.add('active') 
    })
})


//typing text animation

const text = document.querySelector(".sec-text");

const textLoad = (e) => {
    setTimeout(() => {
        text.textContent = "Frontend Developer";
    }, 200);
    setTimeout(() => {
        text.textContent = "Wordpress Developer";
    }, 4000);
    setTimeout(() => {
        text.textContent = "FullStack Developer";
    }, 8000);
    console.log(e)
}

textLoad();
setInterval(textLoad, 12000);
