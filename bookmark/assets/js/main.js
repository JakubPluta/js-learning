const myForm = document.getElementById("my-form");

myForm.addEventListener("submit", saveBookmark);


function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }


function saveBookmark(e) {
  e.preventDefault();

  let siteName = document.getElementById("site-name").value;
  let siteUrl = document.getElementById("site-url").value;


  if(!validateForm(siteName, siteUrl)){
    return false;
  }



  let bookmark = {
    name: siteName,
    url: siteUrl,
  };

  if (localStorage.getItem("bookmarks") === null) {
    let bookmarks = [];

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    if (
      bookmarks.some((b) => b.name.toLowerCase() === bookmark.name.toLowerCase() && b.url.toLowerCase() === bookmark.url.toLowerCase())
    ) {
    } else {
      bookmarks.push(bookmark);
    }

    // re-set back to local storage with update bookmark

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

   // Clear form
   document.getElementById('my-form').reset();

   // Re-fetch bookmarks
   fetchBookmarks();
};

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }

function fetchBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    let bookmarkResults = document.getElementById("bookmarks-results")
    
    bookmarkResults.innerHTML = '';

    for(let bookmark of bookmarks){
        let name = bookmark.name,  url = bookmark.url

        console.log(`${url}`)
        bookmarkResults.innerHTML += `
        <div class="well">
        <h3>${name}
        <a class="btn btn-default" taget="_blank" href="${addhttp(url)}">Visit</a>
        <a onclick="deleteBookmark(\'${url}\')" class="btn btn-danger" href="#">Delete</a>
        </h3>
        </div>
        `
    }

}

function deleteBookmark(url) {

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i = 0; i < bookmarks.length; i++){
        console.log(bookmarks[i].url, url)
        if(bookmarks[i].url == url){
        bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
    
}

