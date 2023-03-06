const loadPhones = async() => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
             <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                   <h5 class="card-title">${phone.phone_name}e</h5>
              <p class="card-text">This is a longer card with supporting texbelow as a natural lead-in to additional content. This content is a little bit longer.</p>
         </div>
        `;
        phoneContainer.appendChild(phoneDiv)

    })
}

loadPhones();