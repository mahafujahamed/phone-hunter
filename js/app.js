const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 20 phones only
    phones = phones.slice(0, 9);
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
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
         </div>
        `;
        phoneContainer.appendChild(phoneDiv)

    })
}

document.getElementById('btn-search').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
})

const toggleSpinner = isLoading => {
    const loaderSpin = document.getElementById('loader');
    if(isLoading){
        loaderSpin.classList.remove('d-none');
    }
}

// loadPhones();