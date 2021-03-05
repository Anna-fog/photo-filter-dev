'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelector('.filters');
    const inputs = document.querySelectorAll('input');
    const outputs = document.querySelectorAll('output');
    const buttons = document.querySelectorAll('.btn');
    const btnReset = document.querySelector('.btn-reset');
    const btnNext = document.querySelector('.btn-next');

    function handleUpdate(e) {
        const suffix = e.target.dataset.sizing;
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + suffix);
        e.target.nextElementSibling.value = e.target.value;
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

    function addActiveClass(e) {
        buttons.forEach(btn => {
            btn.classList.remove('btn-active');
        });
        e.target.classList.add('btn-active');
    }

    filters.addEventListener('input', (e) => {
        if (e.target.type === 'range') {
           handleUpdate(e);
        }
    });
    btnReset.addEventListener('click', resetFilters);

});