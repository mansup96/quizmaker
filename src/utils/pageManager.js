import RadioQuestBuilder from "../pageTypes/radioQuestBuilder";
import StartPageBuilder from "../pageTypes/startPageBuilder";
import createHTMLBranch from "./createHTMLBranch";
import ImgRadioQuestBuilder from "../pageTypes/imgRadioQuestBuilder";
import QuestionWrapBuilder from "../pageTypes/questionWrapBuilder";
import FinalPageBuilder from "../pageTypes/finalPageBuilder";

const pageMap = {
  radio: RadioQuestBuilder,
  imgRadio: ImgRadioQuestBuilder
};

function pageManager({ startPage, pages, finalPage }, container) {
  let currentPageIndex;
  let result = [];

  goStartPage();

  function goStartPage() {
    startPage.onReady = goFirstQuestion;

    let pageConfig = StartPageBuilder(startPage);

    createHTMLBranch(pageConfig, container);
  }

  function goFirstQuestion() {
    if (pages.length <= 0) return;
    currentPageIndex = 0;

    container.innerHTML = "";
    let wrapConfig = {
      onClickNext: goNextQuestion,
      onClickPrev: goPrevQuestion
    };
    createHTMLBranch(QuestionWrapBuilder(wrapConfig), container);

    flipQuestion();
  }

  function goNextQuestion() {
    if (pages.length <= 0) return;
    currentPageIndex++;

    flipQuestion();
    
  }

  function goPrevQuestion() {
    if (pages.length <= 0) return;
    currentPageIndex--;

    flipQuestion();
  }

  function flipQuestion() {
    let questionWrapper = document.getElementById("question-wrapper");
    questionWrapper.innerHTML = "";
    let currentPage = pages[currentPageIndex];
    if (currentPage) {
      currentPage.onReady = handleReady;
      let pageConfig = getPageType()(currentPage);

      createHTMLBranch(pageConfig, questionWrapper);
		}
		
		if (currentPageIndex >= pages.length) goFinalPage(); 
  }

  function goFinalPage() {
    container.innerHTML = "";
    finalPage.onReady = () => console.log("точно конец");
    let pageConfig = FinalPageBuilder(finalPage);

    createHTMLBranch(pageConfig, container);
  }

  function handleReady({ answer: answer, question: question }) {
    result[currentPageIndex] = {};

    result[currentPageIndex].question = question;

    result[currentPageIndex].answer = answer;

    goNextQuestion();
  }

  function getPageType() {
    return pageMap[pages[currentPageIndex].questionType];
  }
}

export default pageManager;
