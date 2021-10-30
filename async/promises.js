// Promises, Callbacks, Async, Await

// callbacks

const posts = [
  { title: "Post One", body: "This is post one" },
  { title: "Post Two", body: "This is post two" },
  { title: "Post Three", body: "This is post three" },
];

function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });

    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = false;

      if (!error) {
        resolve();
      } else {
        reject("Something get wrong");
      }
    }, 2000);
  });
}


// async await

// async function init() {
//     await createPost({title: 'New title', body: 'This is example post'});
//     getPosts();

// }

// init();

async function fetchUsers(){
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json();
    console.log(data);
}

fetchUsers();

// createPost({title: 'New title', body: 'This is example post'}).then(getPosts).catch(err=>console.log(err));


// Promise.all

// const promise1 = Promise.resolve('Hello World');
// const promise2 = 10
// const promise3 = new Promise((resolve, rejest)=>setTimeout(resolve, 2000, 'Goodbye'));

// const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(
//     response => response.json()
// );

// Promise.all([promise1, promise2, promise3, promise4]).then(
//     (values) => console.log(values)
// );