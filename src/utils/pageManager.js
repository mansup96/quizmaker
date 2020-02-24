import RadioQuestBuilder from "../pageTypes/radioQuestBuilder";
import StartPageBuilder from "../pageTypes/startPageBuilder";
import createHTMLBranch from "./createHTMLBranch";
import ImgRadioQuestBuilder from "../pageTypes/imgRadioQuestBuilder";
import rangeNumberQuestBulder from "../pageTypes/rangeNumberQuestBuilder";
import QuestionWrapBuilder from "../pageTypes/questionWrapBuilder";
import FinalPageBuilder from "../pageTypes/finalPageBuilder";
import sendRequest from "../utils/sendRequest";

const pageMap = {
  radio: RadioQuestBuilder,
  imgRadio: ImgRadioQuestBuilder,
  rangeNumber: rangeNumberQuestBulder
};

function pageManager({ startPage, pages, finalPage }, container) {
  let currentPageIndex = -1,
    result = [],
    logicFlag = false,
    startLogic,
    endLogic;

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
    // debugger;
    if (currentPageIndex === -1 || !pages[currentPageIndex].logic)
      currentPageIndex++;
    else {
      startLogic = currentPageIndex;
      endLogic = currentPageIndex + pages[currentPageIndex].logic.logicLength;
      if (
        pages[currentPageIndex].logic.logicOption ===
        result[currentPageIndex].selectedOption - 1
      ) {
        currentPageIndex++;
        logicFlag = true;
      } else {
        currentPageIndex += pages[currentPageIndex].logic.logicLength + 1;
        logicFlag = false;
      }
    }
    container.innerHTML = "";

    getBtnsConfig();
    flipQuestion();
  }

  function goPrevQuestion() {
    if (pages.length <= 0) return;
    // debugger;
    if (logicFlag) currentPageIndex--;
    else {
      if (currentPageIndex - 1 === endLogic)
        currentPageIndex -= endLogic - startLogic + 1;
      else currentPageIndex--;
    }
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

      questionWrapper.append(questionDomObj);
    }

    if (currentPageIndex >= pages.length) goFinalPage();
  }

  function goFinalPage() {
    container.innerHTML = "";
    let requestURL = "send.php";
    finalPage.onReady = () => sendRequest("POST", requestURL, result); 
    let finalPageDOM = FinalPageBuilder(finalPage);

    container.append(finalPageDOM);
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
