document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  // set focus
  setSearchFocus();

  const search = document.getElementById("search");
  search.addEventListener("input", clearTextButton);

  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitSearch);
};

function submitSearch(e) {
  e.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
}

function deleteSearchResults() {
  const parentElement = document.getElementById("searchResults");
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
}

function setSearchFocus() {
  document.getElementById("search").focus();
}

function getSearchTerm() {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");
  return searchTerm;
}

function getMaxChars() {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;
  if (width < 414) {
    maxChars = 65;
  } else if (width >= 414 && width < 1400) {
    maxChars = 100;
  } else {
    maxChars = 130;
  }
  return maxChars;
}

function getWikiSearchString(searchTerm) {
  const maxCharacters = getMaxChars();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxCharacters}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
}

async function requestData(searchString) {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function retrieveSearchResults(searchTerm) {
  const wikiSearchString = getWikiSearchString(searchTerm);
  const wikiSearchResults = await requestData(wikiSearchString);
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty("query")) {
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
}

async function processTheSearch() {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") {
    return;
  }
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) {
    buildSearchResults(resultArray);
  }
  setStatsLine(resultArray);
}

function clearTextButton() {
  const search = document.getElementById("search");
  const clear = document.getElementById("clear");
  if (search.value.length > 0) {
    clear.classList.remove("none");
    clear.classList.add("flex");
  } else {
    clear.classList.add("none");
    clear.classList.remove("flex");
  }
}

function buildSearchResults(resultArray) {
  resultArray.forEach((result) => {
    console.log(result);
    const resultItem = createResultItem(result);
    const resultContents = document.createElement("div");
    resultContents.classList.add("resultContents");
    if (result.img) {
      const resultImage = createResultImg(result);
      resultContents.append(resultImage);
    }
    const resultText = createResultText(result);
    resultContents.append(resultText);
    resultItem.append(resultContents);
    const searchResults = document.getElementById("searchResults");
    searchResults.append(resultItem);
  });
}

function createResultItem(result) {
  const resultItem = document.createElement("div");
  resultItem.classList.add("resultItem");
  const resultTitle = document.createElement("div");
  resultTitle.classList.add("resultTitle");
  const link = document.createElement("a");
  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = "_blank";
  resultTitle.append(link);
  resultItem.append(resultTitle);
  return resultItem;
}

function createResultImg(result) {
  const resultImage = document.createElement("div");
  resultImage.classList.add("resultImage");
  const img = document.createElement("img");
  img.src = result.img;
  img.alt = result.title;
  resultImage.append(img);
  return resultImage;
}

function createResultText(result) {
  const resultText = document.createElement("div");
  resultText.classList.add("resultText");
  const resultDescription = document.createElement("p");
  resultDescription.classList.add("resultDescription");
  resultDescription.textContent = result.text;
  resultText.append(resultDescription);
  return resultText;
}

function clearStatsLine() {
  document.getElementById("stats").textContent = "";
}

function setStatsLine(numberOfResults) {
  console.log(numberOfResults);
  const statsLine = document.getElementById("stats");
  if (numberOfResults) {
    statsLine.textContent = `Displaying: ${numberOfResults.length} results.`;
  } else {
    statsLine.textContent = `Sorry, no results`;
  }
}

function processWikiResults(results) {
  const resultArray = [];
  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key].hasOwnProperty("thumbnail")
      ? results[key].thumbnail.source
      : null;
    const item = {
      id: id,
      title: title,
      img: img,
      text: text,
    };
    resultArray.push(item);
  });
  return resultArray;
}

function clearSearchText(e) {
  e.preventDefault();
  document.getElementById("search").value = "";
  const clear = document.getElementById("clear");
  clear.classList.add("none");
  clear.classList.remove("flex");
  setSearchFocus();
}

function clearPushListener(e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    document.getElementById("clear").click();
  }
}
