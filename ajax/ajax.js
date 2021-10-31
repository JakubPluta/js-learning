let b1 = document.getElementById('b1')

b1.addEventListener('click', loadUser);

let b2 = document.getElementById('b2')

b2.addEventListener('click', loadUsers);

function loadUser(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET','user.json', true);

    xhr.onload = function() {
        if(this.status == 200){
            let user = JSON.parse(this.response);
            let output = '';

            output += `
            <li>ID: ${user.id}</li>
            <li>NAME:  ${user.name}</li>
            <li>USERNAME: ${user.username}</li>
            <li>EMAIL: ${user.email}</li>
            <li>CITY: ${user.address.city}</li>`
        document.getElementById('user').innerHTML = output;
        }
    }

    xhr.send();
}



function loadUsers(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET','users.json', true);

    xhr.onload = function() {
        if(this.status == 200){
            let users = JSON.parse(this.response);
            let output = '';

            for(let user of users){

            output += `
            <li>ID: ${user.id}</li>
            <li>NAME:  ${user.name}</li>
            <li>USERNAME: ${user.username}</li>
            <li>EMAIL: ${user.email}</li>
            <li>CITY: ${user.address.city}</li><br>`
        }

        document.getElementById('user').innerHTML = output;
        }
    }

    xhr.send();
}