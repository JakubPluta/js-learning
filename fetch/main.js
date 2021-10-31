const users = [
  {
    id: 1,
    name: "Rick",
    email: "rick@gmail.com",
  },
  {
    id: 2,
    name: "Glenn",
    email: "glenn@gmail.com",
  },
  {
    id: 3,
    name: "Negan",
    email: "negan@gmail.com",
  },
];

const textButton = document.getElementById("getText");
const usersButton = document.getElementById("getUsers");
const postsButton = document.getElementById("getPosts");
const postFrom = document.getElementById("addPost");

textButton.addEventListener("click", getText);

function getText() {
  fetch("file.txt")
    .then((res) => {
      return res.text();
    })
    .then((data) => document.getElementById("output").innerText=data)
    .catch((err)=> console.log(err));
}

usersButton.addEventListener("click", getUsers);

function getUsers(){
  fetch('users.json').then(
    (res) => {return res.json()}
  ).then(
    (data) => {
      let output = "";
      
      for(let user of data){
        output += `
        <div class="user">
        <h3>${user.name}</h3>
        <h5>${user.email}</h5>
        <br>
        `
      }
      document.getElementById("output").innerHTML=output;
    }
  )
}

postsButton.addEventListener("click", getPosts);



function getPosts(){
  fetch('https://jsonplaceholder.typicode.com/posts').then(
    (res) => {return res.json()}
  ).then(
    (data) => {
      let output = "";
      output += "<h1 class='mb-4'>Posts</h1><br>"

      data.forEach((post)=>{

        output += `
        <div class="post card card-body mb-3">
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        </div>

        `
      })
      document.getElementById("output").innerHTML=output;
    }
  )
}

postFrom.addEventListener("submit", addPost);

function addPost(e){
  e.preventDefault();
  let title = document.getElementById("title").value
  let body = document.getElementById("body").value

  console.log(title,body)

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method:"POST",
    headers: {
      'Accept' : 'application/json, text/plain, */*',
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body,
    })
  }).then((res) => res.json()).then((data) => console.log(data))
}