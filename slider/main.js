const slides = document.querySelectorAll(".slide");
console.log(slides);
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

const auto = true;
const intervalTime = 5000;

let slideInterval;

const nextSlide = () => {
  let currentElement = document.querySelector(".current");
  currentElement.classList.remove("current");

  if (currentElement.nextElementSibling) {
    // add current to next sibling
    currentElement.nextElementSibling.classList.add("current");
  } else {
    slides[0].classList.add("current");
  }

  setTimeout(() => currentElement.classList.remove("current"));
};

const prevSlide = () => {
  let currentElement = document.querySelector(".current");
  currentElement.classList.remove("current");

  if (currentElement.previousElementSibling) {
    // add current to next sibling
    currentElement.previousElementSibling.classList.add("current");
  } else {
    slides[slides.length - 1].classList.add("current");
  }

  setTimeout(() => currentElement.classList.remove("current"));
};

next.addEventListener("click", (e) => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(next, intervalTime);
  }
});
prev.addEventListener("click", (e) => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(next, intervalTime);
  }
});

// auto slide

if (auto) {
  // run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}
