const url = "docs/js.pdf";

let pdfDocument = null,
  pageNum = 1,
  isRendering = false,
  isPending = null;

const scale = 1.5;
const canvas = document.querySelector("#pdf-render");
const ctx = canvas.getContext("2d");

// rander page

const renderPage = (num) => {
  isRendering = true;
  pdfDocument.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale: scale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderCtx = {
      canvasContext: ctx,
      viewport,
    };
    page.render(renderCtx).promise.then(() => {
      isRendering = false;

      if (isPending !== null) {
        renderPage(isPending);
        isPending = null;
      }
    });

    // output

    document.querySelector("#page-num").textContent = num;

  });
};


// check for pages rendered;

const queueRenderPage = (num) => {
    if(isRendering){
        isPending = num;
    } else {
        renderPage(num);
    }
}

// show prev page

const showPrevPage = () => {
    if(pageNum <= 1){
        return;
    }
    pageNum--;
    queueRenderPage(pageNum)
}   

// show prev page

const showNextPage = () => {
    if(pageNum >= pdfDocument.numPages){
        return;
    }
    pageNum++;
    queueRenderPage(pageNum)
}   


pdfjsLib.getDocument(url).promise.then((pdfDoc) => {
  pdfDocument = pdfDoc;
  console.log(pdfDocument);

  document.querySelector("#page-count").textContent = pdfDocument.numPages;
  renderPage(pageNum);
});


document.querySelector('#prev-page').addEventListener(
    'click', showPrevPage
)

document.querySelector('#next-page').addEventListener(
    'click', showNextPage
)