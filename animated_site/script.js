
//получаем массив контейнеров со страницы

const containers = [
    document.getElementById("container_1"),
    document.getElementById("container_2"),
    document.getElementById("container_3"),
    document.getElementById("container_4"),
    document.getElementById("container_5"),
    document.getElementById("container_6"),
    document.getElementById("container_7"),
];



//окно обратной связи
const openFeedbackWindow = document.getElementById("open_feedback_window");
const feedbackWindow = document.getElementById("feedback_window");
const sendFeedback = document.getElementById("btn_send_feedback");

//поля в форме обратной связи

const inputName = document.getElementById("input_name");
const inputEmail = document.getElementById("input_email");
const inputMessageType = document.getElementById("input_message_type");
const inputMessage = document.getElementById("input_message");
const gridCheck = document.getElementById("grid_check");


//переменные для бегущей строки в названии
let mySiteTitle = "Welcome to your dream. Travel is beatuful."
let titleOffset = 0;


//функция для создания бегущей строки
function setTitle () {
    let titleSize = 25;
    let documentTitle = "";
    
    
    if ( titleOffset >= mySiteTitle.length) {
        titleOffset = 0;
    }
    
    documentTitle =  mySiteTitle.substr(titleOffset, titleSize);
    titleOffset++;

    if (documentTitle.length < titleSize) {
        documentTitle += " " + mySiteTitle.substr(0,  titleSize - documentTitle.length);
    }

    document.title = documentTitle;
    // console.log(documentTitle)
    setTimeout(setTitle, 100);
};

setTitle();





// Динамическое отображение контейнеров при первой прокрутке
//первый контейнер отрисован по умолчанию
let lastShownContainer = 0;

function onWindowScroll() {
    let container = containers[lastShownContainer];
    // до тех пор, пока виден нижний край отрисованного контейнера и пока не кончатся контейнеры, показываем следующий контейнер
    while (container && (container.offsetHeight + container.offsetTop) <= (window.innerHeight + window.scrollY)) {
        lastShownContainer += 1;
        if (lastShownContainer >= containers.length) {
            return
        }
        container = containers[lastShownContainer];
        container.classList.remove("hidden");
    }
}

// вызов функции отрисовки контейнеров на скролл
window.addEventListener("scroll", onWindowScroll);
// если после загрузки страницы первого контейнера не хватает для появления скролла, то вызываем функцию отрисовки контейнеров
document.addEventListener('DOMContentLoaded', onWindowScroll);

//ссылки в оглавлении не работают, если есть непоказанный контент, для этого:
//1. делаем видимыми все контейнеры
function unHideAllContent() {
    for (let i = 1; i < containers.length; i++) {
        let container = containers[i];
        container.classList.remove("hidden");
    }
}
//2.функция отображения контейнеров срабатывает на нажатие ссылки в меню (за исключением Contact US)
const menuItems = document.getElementsByClassName("main-menu");

for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', unHideAllContent)
}


//вызов модального окна обратной связи при нажатии ссылки Contact Us в меню
openFeedbackWindow.onclick = function () {
    feedbackWindow.classList.remove("hidden");
}


//закрытие модального окна обратной связи
sendFeedback.onclick = function () {
    //проверяем, все ли поля заполнены
    if (inputName.value && inputEmail.value && inputMessageType.value && inputMessage && gridCheck.checked === true) {
        //если все, то закрываем форму
        feedbackWindow.classList.add("hidden");
    }
    //иначе вызываем сообщение
    else {
        alert("Нужно заполнить все поля!")
    }
}