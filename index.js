document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.header__burger');
    const header__nav = document.querySelector('.header__nav');
    const body = document.querySelector('body');
    const header__links = document.querySelectorAll('.menu__link[data-goto]');
    const header = document.querySelector('.header');


    burger.addEventListener('click', () => {

        burger.classList.toggle('active');
        header__nav.classList.toggle('active');
        body.classList.toggle('lock');
    });

    
    if (header__links.length > 0) {

        header__links.forEach(menu__link => {

            menu__link.addEventListener('click', makeScroll);
        })
    };

    function makeScroll(e) {

        const menu__link = e.target;
        if (menu__link.dataset.goto && document.querySelector(menu__link.dataset.goto)) {

            // menu__link.dataset.goto - значення атрибута, яке містить інформацію про те, куди слід прокручувати сторінку
            // document.querySelector(menu__link.dataset.goto) - сам блок на який потрібно перейти

            const gotoBlock = document.querySelector(menu__link.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            if (burger.classList.contains('active')) {

                    burger.classList.remove('active');
                    header__nav.classList.remove('active');
                    body.classList.remove('lock');
            }
        }
        e.preventDefault();
    }

    const bodyWidth = body.clientWidth;
    if (bodyWidth >= 998) {
        
    window.addEventListener('scroll', handleScroll);
   
    let lastScrollPos = window.scrollY;

    function handleScroll() {

        const currentScrollPos = window.scrollY;
        if (currentScrollPos > lastScrollPos && currentScrollPos > 30) {
            header.classList.add('behind');
        } else {
            header.classList.remove('behind');
        }

        lastScrollPos = currentScrollPos;
    }
    }


});
