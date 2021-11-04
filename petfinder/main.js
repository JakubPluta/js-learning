


const key = "replace";
const secretKey = "replace";
const validZip = /^\d{5}$/;


// fetch token from api key and secret key

fetch("https://api.petfinder.com/v2/oauth2/token", {
  body: `grant_type=client_credentials&client_id=${key}&client_secret=${secretKey}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  method: "POST",
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    token = data.access_token;

  });

const petForm = document.getElementById("pet-form");
const error = document.getElementById("error");
const results = document.getElementById("results");

petForm.addEventListener("submit", fetchAnimals);

function fetchAnimals(e) {
  e.preventDefault();

  const animal = document.getElementById("animal").value;
  const zip = document.getElementById("zip").value;
//   const state = document.getElementById("state").value

  fetch(`https://api.petfinder.com/v2/animals/?type=${animal}&contact.address.postcode=${zip}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
        showAnimals(data.animals);
    });
}

function showAnimals(pets){
    results.innerHTML ='';
    pets.forEach((pet) => {
        const div = document.createElement("div");
        div.classList.add('card' ,'card-body','mb-3')
        div.innerHTML = `
        <div class="row">
        <div class="col-sm-6">
          <h4>${pet.name} (${pet.age})</h4>
          <p class="text-secondary">${pet.breeds.primary}</p>
          <p>${pet.contact.address.city}, ${pet.contact.address.state} ${
      pet.contact.address.postcode
    }</p>
          <ul class="list-group">
            <li class="list-group-item">${
              pet.contact.phone
                ? `<li class="list-group-item">Phone: ${pet.contact.phone}</li>`
                : ``
            }</li>
            ${
              pet.contact.email
                ? `<li class="list-group-item">Email: ${pet.contact.email}</li>`
                : ``
            }
            <li class="list-group-item">Shelter ID: ${pet.organization_id}</li>
          </ul>
        
        </div>
        <div class="col-sm-6">
        <img class="img-fluid rounded-circle mt-2" src="${
          pet.photos[0] ? pet.photos[0].medium : ""
        }">
        </div>
      </div>
    `;

        results.appendChild(div);
    })
}



// check if the zip code is valid
petForm.addEventListener('submit', e => {
    // since we are adding an event listener on a submit event we are adding the preventDefault()
    // to avoid the form from submitting to a backend page
    e.preventDefault();
    // Access user input
    const animal = document.getElementById('animal').value;
    const zip = document.getElementById('zip').value;
      if (validZip.test(zip)) {
      results.innerHTML = '<div class="small"><iframe src="https://giphy.com/embed/lpOxKH3VWxTPi" width="100px" height="100px" frameBorder="0" class="giphy-embed"></iframe></div>';
      setTimeout(() => {
        fetchAnimals();
      }, 2000);
    } else {
      error.textContent = '(Enter a valid zip code)';
      error.style.color = 'tomato';
      setTimeout(() => {
        error.textContent = '';
      }, 1000);
    }
  });