'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelector('.filters');
    const inputs = document.querySelectorAll('input');
    const outputs = document.querySelectorAll('output');
    const buttons = document.querySelectorAll('.btn');
    const btnReset = document.querySelector('.btn-reset');
    const btnNext = document.querySelector('.btn-next');
    const btnLoad = document.querySelector('.btn-load--input');
    const img = document.querySelector('img');
    const btnFullScreen = document.querySelector('.openfullscreen');
    const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

    function handleUpdate(e) {
        const suffix = e.target.dataset.sizing;
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + suffix);
        e.target.nextElementSibling.value = e.target.value;
    }

    function addActiveClass(e) {
        buttons.forEach(btn => {
            btn.classList.remove('btn-active');
        });
        if (e.target.classList.contains('btn')) {
            e.target.classList.add('btn-active');
        }
    }

    function resetFilters(e) {
        addActiveClass(e);
        inputs.forEach(input => {
            input.value = input.defaultValue;
            document.documentElement.style.setProperty(`--${input.name}`,`${input.value}` + input.dataset.sizing);
            outputs.forEach(output => {
                output.value = '0';
            });
        });
    }

    let i = 0;
    let timeOfDay = '';
    function nextPicture(e) {
        addActiveClass(e);
        const index = i % images.length;
        i++
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) timeOfDay = 'morning';
        else if (hour >= 12 && hour < 18) timeOfDay = 'day';
        else if (hour >= 18 && hour < 24) timeOfDay = 'evening';
        else  timeOfDay = 'night';
        img.src = `assets/img/${timeOfDay}/${images[index]}`;
    }

    function loadPicture() {
        const file = btnLoad.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const newImg = new Image();
            newImg.src = reader.result;
            img.src = newImg.src;
        }
        reader.readAsDataURL(file);
    }

    function toggleFullScreen() {
        !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen();
    }

    filters.addEventListener('input', (e) => {
        if (e.target.type === 'range') handleUpdate(e);
    });
    btnLoad.addEventListener('click', (e) => {
        addActiveClass(e);
        document.querySelector('.btn-load').classList.add('btn-active');
    });
    btnReset.addEventListener('click', resetFilters);
    btnNext.addEventListener('click', nextPicture);
    btnLoad.addEventListener('change', loadPicture);
    btnFullScreen.addEventListener('click', toggleFullScreen);
});