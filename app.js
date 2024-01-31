let listGameNumber = [];
let limitNumberToLengthList = 4;
let secretNumber = generateRandomNumber();
let attemptNumber = 1;

function showTextOnScreen(tag, text) {
    let fieldHTML = document.querySelector(tag);
    fieldHTML.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', 
    {rate: 1.1});
}

function showMessageInitial() {
    showTextOnScreen('h1', 'Jogo do número secreto');
    showTextOnScreen('p', 'Escolha um número entre 1 e 10');
}

showMessageInitial();

function checkYourLuck() {
    let yourGuess = document.querySelector('input').value;
    if (yourGuess == secretNumber) {
        showTextOnScreen('h1', 'Acertou!');
        let wordAttempt = attemptNumber > 1 ? 'tentativas' : 'tentativa';
        let showMessageToWinner = `Você descobriu o número secreto com ${attemptNumber} ${wordAttempt}!`;
        showTextOnScreen('p', showMessageToWinner);
        getIdFieldAndRemoveAttribute('reiniciar', 'disabled');
        document.querySelector('input').setAttribute('disabled', true);
        getIdFieldAndSetAttribute('yourLuck', 'disabled', true);
    }
    else if (yourGuess == '') {
        showTextOnScreen('p', 'Por favor, digite um número!');
    } else {
        if (yourGuess > secretNumber) {
            showTextOnScreen('p', 'O número secreto é menor.');
        } else {
            showTextOnScreen('p', 'O número secreto é maior.');
        }
        attemptNumber++;
        clearField();
    }
}

function generateRandomNumber() {
    let numberRandom = parseInt(Math.random() * 10 + 1);
    let quantityNumberGenerated = listGameNumber.length;

    if (quantityNumberGenerated == limitNumberToLengthList) {
        listGameNumber = [];
    }
    if (listGameNumber.includes(numberRandom)) {
        return generateRandomNumber();
    } else {
        listGameNumber.push(numberRandom);
        return numberRandom;
    }
}

function clearField() {
    yourGuess = document.querySelector('input');
    yourGuess.value = '';
}

function playAgain() {
    secretNumber = generateRandomNumber();
    clearField();
    attemptNumber = 1;
    showMessageInitial();
    getIdFieldAndSetAttribute('reiniciar', 'disabled', true);
    getIdFieldAndRemoveAttribute('yourLuck', 'disabled');
    document.querySelector('input').removeAttribute('disabled');
}

function getIdFieldAndSetAttribute(id, attribute, stateAttribute) {
    return document.getElementById(id).setAttribute(attribute, stateAttribute);
}

function getIdFieldAndRemoveAttribute(id, attribute) {
    return document.getElementById(id).removeAttribute(attribute);
}
