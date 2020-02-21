import RadioQuestBuilder from "../pageTypes/radioQuestBuilder";
import StartPageBuilder from "../pageTypes/startPageBuilder";
import createHTMLBranch from "./createHTMLBranch";
import ImgRadioQuestBuilder from "../pageTypes/imgRadioQuestBuilder";
import rangeNumberQuestBulder from "../pageTypes/rangeNumberQuestBuilder";
import QuestionWrapBuilder from "../pageTypes/questionWrapBuilder";
import FinalPageBuilder from "../pageTypes/finalPageBuilder";

const pageMap = {
  radio: RadioQuestBuilder,
  imgRadio: ImgRadioQuestBuilder,
  rangeNumber: rangeNumberQuestBulder
};

function pageManager({ startPage, pages, finalPage }, container) {
  let currentPageIndex = -1;
  let result = [];

  goStartPage();

  function goStartPage() {
    startPage.onReady = goNextQuestion;

    let startPageDOM = StartPageBuilder(startPage);

    container.append(startPageDOM);
  }

  function getBtnsConfig() {
    if (pages[currentPageIndex]) {
      let wrapConfig = {
        onClickNext: goNextQuestion,
        onClickPrev: goPrevQuestion
      };
      if (currentPageIndex === 0) wrapConfig.prevDisable = 1;
      if (pages[currentPageIndex].questionType !== "rangeNumber") {
        if (!result[currentPageIndex]) {
          wrapConfig.nextDisable = 1;
        }
      }
      container.append(QuestionWrapBuilder(wrapConfig));
    }
  }

  function goNextQuestion() {
    if (pages.length <= 0) return;
    currentPageIndex++;
    container.innerHTML = "";

    getBtnsConfig();
    flipQuestion();
  }

  function goPrevQuestion() {
    if (pages.length <= 0) return;
    currentPageIndex--;
    container.innerHTML = "";

    getBtnsConfig();
    flipQuestion(); 
  }

  function flipQuestion() {
    let questionWrapper = document.getElementById("question-wrapper");
    if (questionWrapper) questionWrapper.innerHTML = "";
    let currentPage = pages[currentPageIndex];

    if (currentPage) {
      currentPage.onReady = handleReady;
      if (result[currentPageIndex]) {
        currentPage.selectedOption = result[currentPageIndex].selectedOption;
      }
      let questionDomObj = getPageType()(currentPage);
			console.log(result) ;
			
      questionWrapper.append(questionDomObj);
    }

    if (currentPageIndex >= pages.length) goFinalPage();
  }

  function goFinalPage() {
    container.innerHTML = "";
    finalPage.onReady = () => console.log("точно конец");
    let finalPageDOM = FinalPageBuilder(finalPage);

    container.append(finalPageDOM);
    console.log(result);
  }

  function handleReady({ answer, question, selectedOption }) {
    result[currentPageIndex] = {};

    // if (currentPageIndex) {
    //   let prevButton = document.querySelector(".prev-button");
    //   console.log(prevButton);
    // }

    result[currentPageIndex].question = question;
    result[currentPageIndex].answer = answer;
    result[currentPageIndex].selectedOption = selectedOption;

    if (pages[currentPageIndex].questionType !== "rangeNumber")
      goNextQuestion();
    else return;
  }

  function getPageType() {
    return pageMap[pages[currentPageIndex].questionType];
  }
}

export default pageManager;
