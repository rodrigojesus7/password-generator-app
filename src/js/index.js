const checkboxes = document.querySelectorAll('.checkbox')
const generateButton = document.querySelector('.generate-button')
const password = document.querySelector('.password-section__password')
const lengthBar = document.querySelector('#character-length')
const lengthNumber = document.querySelector('.character-section__options__length__result__lenght-number')
const strengthBoxes = document.querySelectorAll('.strength-section__status-section__status-container__box__status')
const strengthText = document.querySelector('.strength-section__status-section__status-text')
const copyButton = document.querySelector('.password-section__copy-container__copy-icon')
const copiedText = document.querySelector('#copied-text')
const tooWeak = document.querySelector('#too-weak')
const weak = document.querySelector('#weak')
const medium = document.querySelector('#medium')
const strong = document.querySelector('#strong')

let strengthCount = 0

const charsets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
}


lengthBar.addEventListener('change', function () {

    lengthNumber.textContent = lengthBar.value

})


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



function generatePassword(length, options) {
    let availableChars = "";
    let generatedPassword = "";


    if (options.uppercase) {
        availableChars += charsets.uppercase;
        strengthCount += 1
    }

    if (options.lowercase) {
        availableChars += charsets.lowercase;
        strengthCount += 1
    }

    if (options.numbers) {
        availableChars += charsets.numbers;
        strengthCount += 1
    }
    if (options.symbols) {
        availableChars += charsets.symbols;
        strengthCount += 1
    }

    if (availableChars === "") return "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);

        generatedPassword += availableChars.charAt(randomIndex);
    }

    return generatedPassword;
}



generateButton.addEventListener('click', () => {
    const length = lengthBar.value;

    const options = {
        uppercase: document.querySelector('#uppercase').checked,
        lowercase: document.querySelector('#lowercase').checked,
        numbers: document.querySelector('#numbers').checked,
        symbols: document.querySelector('#symbols').checked
    };

    const newPassword = generatePassword(length, options);

    if (newPassword) {
        password.textContent = newPassword;
        password.classList.remove('password-section__password--inactive')

        console.log(strengthCount)

        strengthBoxes.forEach(box => {
            box.classList.remove('too-weak')
            box.classList.remove('weak')
            box.classList.remove('medium')
            box.classList.remove('strong')
        });

        if (strengthCount === 1) {
            tooWeak.classList.add('too-weak')

            strengthText.textContent = 'TOO WEAK!'

        } else if (strengthCount === 2) {

            tooWeak.classList.add('weak')
            weak.classList.add('weak')

            strengthText.textContent = 'WEAK'

        } else if (strengthCount === 3) {

            tooWeak.classList.add('medium')
            weak.classList.add('medium')
            medium.classList.add('medium')

            strengthText.textContent = 'MEDIUM'

        } else if (strengthCount === 4) {

            tooWeak.classList.add('strong')
            weak.classList.add('strong')
            medium.classList.add('strong')
            strong.classList.add('strong')

            strengthText.textContent = 'STRONG'
        }

        copiedText.classList.add('hidden')

        strengthText.classList.remove('hidden')

        strengthCount = 0
    }
});


copyButton.addEventListener('click', function(){
    navigator.clipboard.writeText(password.textContent)
    copiedText.classList.remove('hidden')
})






