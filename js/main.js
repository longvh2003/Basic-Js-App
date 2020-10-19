const mytable = document.getElementsByTagName("tbody")[0];

calculateSubTotal();
calculateTotal();
markIndex();

function markIndex() {
    for (let i = 0; i < mytable.rows.length; i++) {
        mytable.rows[i].getElementsByTagName("th")[0].innerHTML = i + 1;
    }
}

function decrease(event) {
    if (event.nextSibling.innerHTML > 0)
        event.nextSibling.innerHTML--;
    if (event.nextSibling.innerHTML == 0) {
        var row = event.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
    markIndex();
    calculateSubTotal();
    calculateTotal();
}

function increase(event) {
    if (event.previousElementSibling.innerHTML < 50)
        event.previousElementSibling.innerHTML++;
    calculateSubTotal();
    calculateTotal();
}

function calculateSubTotal() {
    for (let i = 0; i < mytable.rows.length; i++) {
        mytable.rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[1].innerHTML =
            parseFloat(mytable.rows[i].getElementsByTagName("td")[1].querySelectorAll("span")[1].textContent) *
            parseFloat(mytable.rows[i].getElementsByTagName("td")[2].querySelectorAll("span")[0].textContent);
        mytable.rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[1].innerHTML =
            parseFloat(mytable.rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[1].textContent).toFixed(2);
        if (mytable.rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[1].textContent === 'NaN')
            mytable.rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[1].style.display = "none";
        else mytable.rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[1].style.display = "inline";
    }
}

function addColumn() {
    let newNode = document.createElement("tr");
    let i = mytable.rows.length;
    newNode.innerHTML = `<th scope="row">${i+1}</th>
    <td contenteditable></td>
    <td><span>$</span><span contenteditable class="unitPrice" onblur="editPrice()"></span></td>
    <td><i class="far fa-minus-square" onclick="decrease(this)"></i><span class="quatity">1</span><i class="far fa-plus-square" onclick="increase(this)"></i></td>
    <td><span>$</span><span class="total"></span></td>`;
    mytable.appendChild(newNode);
}

function calculateTotal() {
    let sum = 0;
    for (let i = 0; i < mytable.rows.length; i++) {
        if (mytable.rows[i].getElementsByTagName("td")[3].querySelectorAll("span")[1].textContent !== "NaN")
            sum += parseFloat(mytable.rows[i].getElementsByTagName("td")[3].querySelectorAll("span")[1].textContent);
    }
    document.getElementsByTagName('tbody')[1].getElementsByTagName('tr')[1].getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerHTML = sum.toFixed(2);
}

function editPrice() {
    calculateSubTotal();
    calculateTotal();
}