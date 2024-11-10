//inputs
//add button
//list

const expenseInput = document.querySelector("#expense");
const priceInput = document.querySelector("#price");

const formBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");

const totalInfo = document.querySelector("#total-info");

const nameInput = document.getElementById("name-input");

const statusCheck = document.getElementById("status-input");

const selectFilter = document.getElementById("filter-select");

const userName = localStorage.getItem("name");
nameInput.value = userName;
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

formBtn.addEventListener("click", addExpense);

list.addEventListener("click", handleClick);

selectFilter.addEventListener("change", handleFilter);

let totalExpenses = 0;

function updateTotal(price) {
  totalExpenses += Number(price);
  totalInfo.innerText = totalExpenses;
}

function addExpense(e) {
  e.preventDefault();

  if (!expenseInput.value || !priceInput.value) {
    alert("Fill all empty field!");
  } else {
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense");
    if (statusCheck.checked) {
      expenseDiv.classList.add("paid");
    }
expenseDiv.innerHTML = `<h2>${expenseInput.value}</h2>
         <h2 id='value'>${priceInput.value}</h2>
            <div class="buttons">
              <img id='payment' src="./images/pay.png" alt="">
              <img id='remove' src="./images/remove.png" alt="">
         </div>
            `;
    list.appendChild(expenseDiv);
    updateTotal(priceInput.value);
  }

  expenseInput.value = "";
  priceInput.value = "";
}

function handleClick(e) {
  let clickedElement = e.target;

  if (clickedElement.id === "remove") {
    const containerElement = clickedElement.parentElement.parentElement;

    const deletedPrice = containerElement.querySelector("#value").innerText;
    updateTotal(-Number(deletedPrice));
    containerElement.remove();
  }
}

function handleFilter(e) {
  const expenseCards = list.childNodes;
  const filterValue = e.target.value;
  expenseCards.forEach((item) => {
    switch (filterValue) {
      case "all":
        item.style.display = "flex";
        break;

      case "paid":
        if (!item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
            item.style.display= "flex"
        }
        break;

        case "not-paid":
            if(item.classList.contains("paid")){
                item.style.display="none"
            }
            else{
                item.style.display="flex"
            }
            break;
    }
  });
}
