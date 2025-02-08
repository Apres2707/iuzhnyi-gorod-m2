console.log("page load!");
function calculatePrice() {
        let textPrice = document.getElementsByClassName("_action").item(0).innerHTML.replace(/&nbsp;/g, '').replace(/ ₽/g, '');
        let price = parseInt(textPrice, 10);

        let textSquare = document.getElementsByClassName("FlatInfo_val").item(1).innerHTML.replace(/ м<sup>2<\/sup>/g, '');
        let square = parseFloat(textSquare);
        let pricePerSquareMeter = price / square
        let res = new Intl.NumberFormat('ru-RU').format(Math.round(pricePerSquareMeter))

        let prevDiv = document.getElementsByClassName("FlatPrice_row").item(1)

        let newPriceNameDiv = document.createElement("div");
        newPriceNameDiv.classList.add("FlatPrice_lbl")
        newPriceNameDiv.innerHTML = "Цена за м2:"

        let newPriceValDiv = document.createElement("div");
        newPriceValDiv.classList.add("FlatPrice_val", "_action")
        newPriceValDiv.innerHTML = res + "&nbsp;₽"

        let newPriceRowDiv = document.createElement("div");
        newPriceRowDiv.classList.add("FlatPrice_row")

        newPriceRowDiv.appendChild(newPriceNameDiv);
        newPriceRowDiv.appendChild(newPriceValDiv);

        prevDiv.insertAdjacentElement('afterend', newPriceRowDiv);
}
calculatePrice()
