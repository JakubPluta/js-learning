
document.getElementById('output').style.visibility = 'hidden';
const poundsInput = document.getElementById('pounds-input')
poundsInput.addEventListener('input', (e) => {
    document.getElementById('output').style.visibility = 'visible';
    let pounds = e.target.value;
    document.getElementById('grams-output').innerHTML = poundsToGramsConverter(pounds);
    document.getElementById('kg-output').innerHTML = poundsToGramsConverter(pounds) / 1000;
    document.getElementById('ounces-output').innerHTML = poundsToOz(pounds);
})


function poundsToGramsConverter(lbs){
    let grams = lbs / 0.0022046;
    return grams;

}

function poundsToOz(lbs){
    let oz = lbs *16;
    return oz;

}