function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
}
function calculatePriceForListOfType() {
        let planList = document.getElementsByClassName("PlanList")
        for (let i = 0; i < planList.length; i++) {
                let priceDiv = planList[i].getElementsByClassName("_item9").item(0)
                let textPrice = priceDiv.getElementsByTagName("span").item(0).innerHTML.replace(/&nbsp;/g, '').replace(/ ₽/g, '');
                let price = parseInt(textPrice, 10);

                let textSquare = planList[i].getElementsByClassName("_item4").item(0).innerHTML.replace(/ м²/g, '');
                let square = parseFloat(textSquare);

                let pricePerSquareMeter = price / square
                let res = new Intl.NumberFormat('ru-RU').format(Math.round(pricePerSquareMeter))

                let newPriceValSpan = document.createElement("span");
                newPriceValSpan.innerHTML = res + "&nbsp;₽"

                let newPriceDiv = document.createElement("div");
                newPriceDiv.classList.add("PlanList_item", "_item9", "_big")
                newPriceDiv.appendChild(newPriceValSpan);

                priceDiv.insertAdjacentElement('afterend', newPriceDiv)
        }

        return null
}
delay(2000).then(() => calculatePriceForListOfType());
