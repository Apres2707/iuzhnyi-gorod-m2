function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
}

function calculatePriceForList() {
        let cardList = document.getElementsByClassName("ChooseCards_item")
        for (let i = 0; i < cardList.length; i++) {
                let textPrice = cardList[i].getElementsByTagName("span").item(1).innerHTML.replace(/&nbsp;/g, '').replace(/ ₽/g, '');
                let price = parseInt(textPrice, 10);

                let textSquare = cardList[i].getElementsByTagName("span").item(0).innerHTML.replace(/ м²/g, '');
                let square = parseFloat(textSquare);

                let pricePerSquareMeter = price / square
                let res = new Intl.NumberFormat('ru-RU').format(Math.round(pricePerSquareMeter))

                let newPriceNameSpan = document.createElement("span");
                newPriceNameSpan.innerHTML = "Цена за м<sup>2</sup>:"

                let newPriceValSpan = document.createElement("span");
                newPriceValSpan.innerHTML = res + "&nbsp;₽"


                let newPriceDiv = document.createElement("div");
                newPriceDiv.classList.add("PlanCard_row", "_info")
                newPriceDiv.appendChild(newPriceNameSpan);
                newPriceDiv.appendChild(newPriceValSpan);

                cardList[i].getElementsByClassName("_info")[0].insertAdjacentElement('afterend', newPriceDiv)

                if (pricePerSquareMeter < 106000) {
                        cardList[i].getElementsByClassName("PlanCard_inner")[0].setAttribute("style", "background-color: #ccffeb;")
                } else if (pricePerSquareMeter < 110000) {
                        cardList[i].getElementsByClassName("PlanCard_inner")[0].setAttribute("style", "background-color: #d8ebfd;")
                }
        }

        return null
}

function startListObserve() {
        // Выбираем целевой элемент
        let target = document.getElementsByClassName("ChooseCards").item(0)

        // Конфигурация observer (за какими изменениями наблюдать)
        const config = {
                attributes: false,
                childList: true,
                subtree: false,
        };

        // Колбэк-функция при срабатывании мутации
        const callback = function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                        calculatePriceForList();
                }
        };

        // Создаём экземпляр наблюдателя с указанной функцией колбэка
        const observer = new MutationObserver(callback);

        // Начинаем наблюдение за настроенными изменениями целевого элемента
        observer.observe(target, config);
        // Позже можно остановить наблюдение
        // observer.disconnect();

}

delay(2000).then(() => calculatePriceForList()).then(() => startListObserve());
