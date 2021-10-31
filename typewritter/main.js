

document.addEventListener("DOMContentLoaded", init);

function init() {
  // init App
  let txtElement = document.querySelector(".txt-type");
  let words = JSON.parse(txtElement.getAttribute("data-words"));
  let wait = txtElement.getAttribute("data-wait");
  // init TypeWritter
  new TypeWritter(txtElement, words, wait);
}

// ES6 class

class TypeWritter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    let current = this.wordIndex % this.words.length;
    // full text of current word
    const fullTxt = this.words[current];
  
    // check if deleted
    if (this.isDeleting) {
      // remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
    // type speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex += 1;
      typeSpeed = 500;
    }
  
    setTimeout(() => this.type(), typeSpeed);
  };
}
