const text = document.querySelector('#text');
const container = document.querySelector(".container")
const title = document.querySelector('.place')


const totalTime = 7500;
const breathTime = (totalTime/5) *2
const holdTime = totalTime/5

function breathAnimation(){
    text.innerHTML = 'Breath In!'
    container.className = 'container grow'
    title.className = 'place grow'

    setTimeout(()=>{
        text.innerHTML = 'Hold';

        setTimeout(()=>{
            text.innerHTML = 'Breath Out!'
            container.className = 'container shrink'
            title.className = 'place shrink'
        }, holdTime)

    }, breathTime)
}

setInterval(breathAnimation, totalTime)



window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("audio");
    audio.volume = 0.4;
    audio.play();
  });