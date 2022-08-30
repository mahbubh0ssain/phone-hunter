const message = document.getElementById("no-phone");
// const spinner = document.getElementById("spinner");

toggleSpinner = (isSpinning) => {
  const spinner = document.getElementById("spinner");
  if (isSpinning) {
    // isSpinning represents true as paraameter
    spinner.classList.remove("d-none");
  } else {
    // isSpinning represents false as paraameter
    spinner.classList.add("d-none");
  }
};
// button event handler
document.getElementById("button-addon2").addEventListener("click", function () {
  processSearch(10);
});

// search button clicked by enter key
document
  .getElementById("input-field")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      document.getElementById("button-addon2").click();
      // processSearch(10);
    }
  });

// using async and await
fetchMObileData = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const status = await res.json();
  displayMobile(status.data, dataLimit);
};
fetchMObileData("apple");

// display phone
displayMobile = (mobiles, dataLimit) => {
  // spinner.classList.add("d-none");

  const mobileCards = document.getElementById("mobile-cards");

  mobileCards.innerHTML = "";
  if (mobiles.length === 0) {
    message.classList.remove("d-none");
  } else {
    message.classList.add("d-none");
  }
  const showAll = document.getElementById("show-all");
  if (dataLimit && mobiles.length > 10) {
    mobiles = mobiles.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  mobiles.forEach((mobile) => {
    const { phone_name, image, slug } = mobile;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
          <div class="card h-100 shadow">
              <img src="${image}" class="card-img-top img-fluid" alt="..." />
              <div class="card-body">
                <h4 class="card-title">${phone_name}</h4>
                <button onclick="loadPhoneDetails('${slug}')" type="button" class="btn btn-primary"
                  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
              </div>
          </div>
    `;
    mobileCards.appendChild(div);
  });
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  // inputField.value = "";
  if (inputValue === "") {
    message.classList.remove("d-none");
  } else {
    message.classList.add("d-none");
  }
  // spinner.classList.remove("d-none");
  fetchMObileData(inputValue, dataLimit);
};

document.getElementById("show-all").addEventListener("click", function () {
  processSearch();
});

// show phone details on click on the btn of card

loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  shoeDetailsOnMOdal(data.data);
};

shoeDetailsOnMOdal = (details) => {
  const modalDialog = document.getElementById("exampleModalLabel");
  const { name, mainFeatures, image, releaseDate } = details;
  modalDialog.innerText = `${name}`;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <img src="${image}" class="card-img-top img-fluid" alt="..." />
  <p>${releaseDate}</p>
  <p>Storage: ${mainFeatures.storage}</p>
  <p>Memory: ${mainFeatures.memory}</p>
  <p>DisplaySize: ${mainFeatures.displaySize}</p>
  <p>Sensors: ${mainFeatures.sensors.join(", ")}</p>
  `;
};
