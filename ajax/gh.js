const url = 'https://api.github.com/users'


let button = document.getElementById('button')
button.addEventListener('click', loadUsers)

function loadUsers(){

    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function(){
        if(this.status == 200){
            let users = JSON.parse(this.responseText);
            console.log(users)

            var output = '';

            for(let user of users){
                output += `
                <div class="user">
                <img src="${user.avatar_url} width="70" height="70">
                <h3>Login: ${user.login}</h3>
                </div>
                `
            }
            document.getElementById('users').innerHTML = output;
        }
    }

    xhr.send();
}