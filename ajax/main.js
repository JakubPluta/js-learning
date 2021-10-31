

let button = document.getElementById('button')

button.addEventListener(
    'click', loadText
)

function loadText() {
    // create XHR object
    var xhr = new XMLHttpRequest();
    // OPEN - type, url/file, async
    // console.log(xhr)
    // Method: GET, file: sample.txt, asycn: true
    xhr.open('GET','sample.txt', true);
    // xhr.open('GET', 'https://www.balldontlie.io/api/v1/players', true);


    // console.log('READYSTATE: ', xhr.readyState)
    xhr.onload = function(){
        if(this.status == 200){
            document.getElementById('text').innerHTML = this.responseText
        }
    }

    // Don't run till readyState
    // xhr.onreadystatechange = function(){
    //     if(this.status == 200 && this.readyState == 4){
    //         document.getElementById('text').innerHTML = this.responseText
    //     }
    // }

    // xhr.onprogress = function(){
    //     console.log(this.readyState)
    // }

    xhr.onerror = function(){
        console.log("REQUEST ERROR")
    }

    // send request
    xhr.send();

}