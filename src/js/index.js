const checkboxes = document.querySelectorAll('.checkbox')


checkboxes.forEach(box => {

    box.addEventListener('change', function () {

        const container = box.nextElementSibling
        const svgIcon = container.querySelector('.svg')


        if (box.checked) {

            container.classList.add('character-section__options__diverse__checkbox--checked')
            svgIcon.classList.remove('hidden')

        } else {
            container.classList.remove('character-section__options__diverse__checkbox--checked')
            svgIcon.classList.add('hidden')
        };

    }
    )

});