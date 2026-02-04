const checkboxes = document.querySelectorAll('.checkbox')
const generateButton = document.querySelector('.generate-button')
const password = document.querySelector('.password-section__password')
const lengthBar = document.querySelector('#character-length')
const lengthNumber = document.querySelector('.character-section__options__length__result__lenght-number')

const charsets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
}


lengthBar.addEventListener('change', function(){

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



function generatePassword(length, options){
    let availableChars = "";
    let generatedPassword = "";


    if (options.uppercase) availableChars += charsets.uppercase;
    if (options.lowercase) availableChars += charsets.lowercase;
    if (options.numbers) availableChars += charsets.numbers;
    if (options.symbols) availableChars += charsets.symbols;

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
    }
});



