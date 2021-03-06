'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
    const filters = document.querySelector('.filters');
    const inputs = document.querySelectorAll('input');
    const outputs = document.querySelectorAll('output');
    const buttons = document.querySelectorAll('.btn');
    const btnReset = document.querySelector('.btn-reset');
    const btnNext = document.querySelector('.btn-next');
    const btnLoad = document.querySelector('.btn-load--input');
    const btnSave = document.querySelector('.btn-save');
    const btnFullScreen = document.querySelector('.openfullscreen');
    const img = document.querySelector('img');
    const canvas = document.querySelector('canvas');
    let currentPicture = "assets/img/img.jpg";
    const ctx = canvas.getContext("2d");
    let currentFilters = '';
    let mapOfFilters = new Map();

    function handleUpdate(e) {
        const suffix = e.target.dataset.sizing;
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + suffix);
        e.target.nextElementSibling.value = e.target.value;

        img.setAttribute('crossOrigin', 'anonymous');
        ctx.drawImage(img, 0, 0);
        mapOfFilters.set(e.target.name === 'hue' ? e.target.name + '-rotate' : e.target.name, e.target.value + suffix);
        let filtersStr = '';
        mapOfFilters.forEach((value, key) => {
            filtersStr += `${key}(${value}) `
        });
        ctx.filter = filtersStr;
        currentFilters = filtersStr;
    }

    function addActiveClass(e) {
        buttons.forEach(btn => {
            btn.classList.remove('btn-active');
        });
        const classes = e.target.classList;
        classes.contains('btn') ? classes.add('btn-active') : document.querySelector('.btn-load').classList.add('btn-active');
    }

    function resetFilters(e) {
        addActiveClass(e);
        mapOfFilters = new Map();
        inputs.forEach(input => {
            input.value = input.defaultValue;
            document.documentElement.style.setProperty(`--${input.name}`,`${input.value}` + input.dataset.sizing);
            outputs.forEach(output => {
                output.value = '0';
            });
            ctx.drawImage(img, 0, 0);
            ctx.filter = `${input.name === 'hue' ? input.name + '-rotate' : input.name}(${input.value}${input.dataset.sizing})`;
        });
    }

    let i = 0;
    let timeOfDay = '';

    function nextPicture(e) {
        addActiveClass(e);

        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) timeOfDay = 'morning';
        else if (hour >= 12 && hour < 18) timeOfDay = 'day';
        else if (hour >= 18 && hour < 24) timeOfDay = 'evening';
        else timeOfDay = 'night';

        const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/`;
        const index = i % images.length;
        const imgSrc = base + images[index];
        currentPicture = imgSrc;
        drawImage();
        img.src = imgSrc;
        i++
    }

    function loadPicture() {
        const file = btnLoad.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const newImg = new Image();
            newImg.src = reader.result;
            img.src = newImg.src;
            currentPicture = img.src;
            drawImage();
        }
        reader.readAsDataURL(file);
    }

    function savePicture(e) {
        addActiveClass(e);
        let link = document.createElement('a');
        link.download = 'download.jpg';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
    }

    function drawImage() {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = currentPicture;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = currentFilters;
            ctx.drawImage(img, 0, 0);
        };
    }

    function toggleFullScreen() {
        !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen();
    }

    btnLoad.addEventListener('click', addActiveClass);
    filters.addEventListener('input', handleUpdate);
    filters.addEventListener('click', handleUpdate);
    btnReset.addEventListener('click', resetFilters);
    btnNext.addEventListener('click', nextPicture);
    btnLoad.addEventListener('change', loadPicture);
    btnSave.addEventListener('click', savePicture);
    btnFullScreen.addEventListener('click', toggleFullScreen);
    drawImage();
});