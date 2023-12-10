document.addEventListener('DOMContentLoaded', () => {

const burger = document.querySelector('.header__burger');
const header__nav = document.querySelector('.header__nav');
const body = document.querySelector('body');

burger.addEventListener('click', ()=>{

    burger.classList.toggle('active');
    header__nav.classList.toggle('active');
    body.classList.toggle('lock');
});

});
