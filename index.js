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

            const goto__Block = document.querySelector(menu__link.dataset.goto);
            const goto__Block_Value = goto__Block.getBoundingClientRect().top + scrollY;
            window.scrollTo({
                top: goto__Block_Value,
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

    const body__Width = body.clientWidth;

    if (body__Width >= 998) {

        window.addEventListener('scroll', handleScroll);

        let last__Scroll_Pos = window.scrollY;

        function handleScroll() {

            const current__Scroll_Pos = window.scrollY;
            if (current__Scroll_Pos > last__Scroll_Pos) {
                header.classList.add('behind');
            } else {
                header.classList.remove('behind');
            }

            last__Scroll_Pos = current__Scroll_Pos;
        }
    }



    const menu__columns = document.querySelector('.menu__columns');
    const menu__column = document.querySelectorAll('.menu__column');
    const btn__prev = document.querySelector('.btn-prev');
    const btn__next = document.querySelector('.btn-next');
    const columns__track = document.querySelector('.columns__track')

    const column__count = menu__column.length;
    let position = 0;
    let columns__scroll = 1;
    let columns__show;

    if (body.clientWidth > 1400) {

        columns__show = 3;
    } else if (body__Width > 998 && body__Width < 1400) {

        columns__show = 2;
    } else {

        columns__show = 1;
    }

    const column__width = menu__columns.clientWidth / columns__show;
    const move__position = columns__scroll * column__width;

    menu__column.forEach((item) => {

        if (body__Width <= 998) {
            item.style.minWidth = `${column__width}px`;
        } else {
            item.style.minWidth = `${column__width - 10}px`;
        }
    });

    btn__next.addEventListener('click', () => {

        const columns__left = column__count - (Math.abs(position) + columns__show * column__width) / column__width;
        if (columns__left >= columns__scroll) {
            position = position - move__position;
        } else {
            position = position - columns__left * column__width;
        }

        setPosition();
        checkBtns();
    });

    btn__prev.addEventListener('click', () => {

        const columns__left = Math.abs(position) / column__width;
        position += columns__left >= columns__scroll ? move__position : columns__left * column__width;

        setPosition();
        checkBtns();
    });

    const setPosition = () => {

        columns__track.style.transform = `translateX(${position}px)`;
    };

    const checkBtns = () => {

        btn__prev.disabled = position === 0;
        btn__next.disabled = position <= -(column__count - columns__show) * column__width;
    };

    checkBtns();

});
