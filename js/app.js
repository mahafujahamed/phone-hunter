const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 20 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
             <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                   <h5 class="card-title">${phone.phone_name}e</h5>
              <p class="card-text">${phone.slug}</p>
              <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
         </div>
        `;
        phoneContainer.appendChild(phoneDiv)

    });
    // stop loader
    toggleSpinner(false);
}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(9);
})
//  search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        //code for enter 
        processSearch(9);
    }
});
const toggleSpinner = isLoading => {
    const loaderSpin = document.getElementById('loader');
    if (isLoading) {
        loaderSpin.classList.remove('d-none');
    }
    else {
        loaderSpin.classList.add('d-none');
    }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <h3>Brand: ${phone.brand}</h3>
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No dta found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage information'}</p>
        <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No data found'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth information'}</p>
        <ul>
        <h4>Sensors: </h4>
            <li>${phone.mainFeatures ? phone.mainFeatures.sensors[0] : 'No sensors'}</li>
            <li>${phone.mainFeatures ? phone.mainFeatures.sensors[1] : 'No sensors'}</li>
            <li>${phone.mainFeatures ? phone.mainFeatures.sensors[2] : 'No sensors'}</li>
            <li>${phone.mainFeatures ? phone.mainFeatures.sensors[3] : 'No sensors'}</li>
            <li>${phone.mainFeatures ? phone.mainFeatures.sensors[4] : 'No sensors'}</li>
            <li>${phone.mainFeatures ? phone.mainFeatures.sensors[5] : 'No sensors'}</li>
        </ul>
    `
}

// Geolacation-----
const x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}


// loadPhones();