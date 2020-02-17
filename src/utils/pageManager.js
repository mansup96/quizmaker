import RadioQuestBuilder from "../pageTypes/radioQuestBuilder";
import StartPageBuilder from "../pageTypes/startPageBuilder";
import createHTMLBranch from "./createHTMLBranch";

const pageMap = {
  radio: RadioQuestBuilder
};

function pageManager({ startPage, pages, finalPage }, container) {
  let currentPageIndex;
  let result = [];

  function goFirstQuestion() {
		if (pages.length <= 0) return;
		currentPageIndex = 0;
		
    flipQuestion ()
  }

  function goNextQuestion() {
    if (pages.length <= 0) return;
    currentPageIndex++;

    flipQuestion () 
	}
	
	function flipQuestion () {
		container.innerHTML = "";

    let currentPage = pages[currentPageIndex];
    currentPage.onReady = handleReady;
    let pageConfig = getPageType()(currentPage); 

    createHTMLBranch(pageConfig, container);
	}

  function goStartPage() {
    startPage.onReady = goFirstQuestion;

    let pageConfig = StartPageBuilder(startPage);

    createHTMLBranch(pageConfig, container);
  }

  function handleReady(answer) {
    result[currentPageIndex] = answer;

    goNextQuestion();
  }

  function getPageType() {
    return pageMap[pages[currentPageIndex].questionType];
  }

  goStartPage();
}

export default pageManager;
