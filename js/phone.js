const showAllContainer = document.getElementById("show-all-container");

const loadPhone = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // console.log(phones);
  //   step 1
  const phoneContainer = document.getElementById("phone-container");
  //   clear phone container card before adding new card
  phoneContainer.textContent = "";

  // show more button
  // console.log(showAllContainer);
  // if (phones.length > 12) {
  //   showAllContainer.classList.remove('hidden');
  // } else {
  //   showAllContainer.classList.add('hidden');
  // }

  // display only first 12 phones
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card card-compact  bg-base-100 shadow-xl`;
    // 3. set innerHTML
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center mt-2">
            <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    // 4 append child
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading
  toggolLoadingBears(false);
};

// handle search button
const handleSearch = () => {
  toggolLoadingBears(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
};

const toggolLoadingBears = (isLoading) => {
  const loadingBears = document.getElementById("loading-bears");
  if (isLoading) {
    loadingBears.classList.remove("hidden");
  } else {
    loadingBears.classList.add("hidden");
  }
};

const handleShowDetails = async (id) => {
  console.log(id);
  // load single phone data
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const phone = data.data;

  showPhoneDetails(phone);
  // toggolLoadingBears(true)
};

const showPhoneDetails = (phone) => {

  console.log(phone);
  phoneName = document.getElementById("show-details-phone-name");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById("show-details-container");
  showDetailsContainer.innerHTML = `
  <div class = "flex justify-center"><img class = "pt-2" src="${phone.image}" alt=""></div>
  <p class = "pt-2"><span class = "font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p class = "pt-2"><span class = "font-bold">Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
  <p class = "pt-2"><span class = "font-bold">ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
  <p class = "pt-2"><span class = "font-bold">Release Date: </span>${phone?.mainFeatures?.releaseDate || 'Not Available'}</p>
  <p class = "pt-2"><span class = "font-bold">Slug: </span>${phone?.mainFeatures?.slug || 'Not Available'}</p>
  <p class = "pt-2"><span class = "font-bold">Sensors: </span>${phone?.mainFeatures?.sensors || 'Not Available'}</p>
  <p class = "pt-2"><span class = "font-bold">GPS: </span>${phone?.mainFeatures?.GPS || 'Not Available'}</p>
  `
  // toggolLoadingBears(false)

  // show the module
  show_details_module.showModal();
};

// loadPhone();
