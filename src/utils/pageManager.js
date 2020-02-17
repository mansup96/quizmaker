import RadioPageBuilder from "../pageTypes/radioPageBuilder";
import StartPageBuilder from "../pageTypes/startPageBuilder";
import createHTMLBranch from "./createHTMLBranch";

const pageMap = {
  radio: RadioPageBuilder
};

function pageManager({ startPage, pages, finalPage }, container) {
  let currentPageIndex;
  let result;

  function goFirstPage() {
    if (pages.length <= 0) return;
    currentPageIndex = 0;

    container.innerHTML = "";

    let firstPage = pages[currentPageIndex];
    firstPage.onReady = handleReady;
    let pageConfig = getPageType()(firstPage);

    createHTMLBranch(pageConfig, container);
	}
	
  function handleReady(answer) {
    result[currentPageIndex] = answer;

    goNextPage();
  }

  function getPageType() {
    console.log("sdafas");

    return pageMap[pages[currentPageIndex].questionType];
  }

  function goNextPage() {
    currentPageIndex++;

    container.innerHTML = "";

    let currentPage = pages[currentPageIndex];

    currentPage.onReady = handleReady;

    let pageConfig = getPageType()(currentPage);

    createHTMLBranch(pageConfig, container);
  }

  function goStartPage() {
    startPage.onReady = goFirstPage;

    let pageConfig = StartPageBuilder(startPage);

    createHTMLBranch(pageConfig, container);
  }
  goStartPage();
}

export default pageManager;
