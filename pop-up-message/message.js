const popups = document.querySelectorAll(".popup");
const alertPopup = document.querySelector('.output');
const popMessage = document.querySelector('.message');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', function() {
    alertPopup.classList.add('hide');
});

document.addEventListener('click', function() {
    if (!alertPopup.classList.contains('hide')) {
        alertPopup.classList.add('hide');
    }
});

for (popup of popups) {
    popup.addEventListener('click', function(event) {
        let text = this.getAttribute('data-message');
        message(text);
        event.stopPropagation();
    });
}


function message(output) {
    alertPopup.classList.remove('hide');
    popMessage.innerText = output;
}