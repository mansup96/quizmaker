import RadioQuestBuilder from "../pageTypes/radioQuestBuilder";
import CheckQuestBuilder from "../pageTypes/checkQuestBuilder";
import StartPageBuilder from "../pageTypes/startPageBuilder";
import ImgRadioQuestBuilder from "../pageTypes/imgRadioQuestBuilder";
import rangeNumberQuestBulder from "../pageTypes/rangeNumberQuestBuilder";
import QuestionWrapBuilder from "../pageTypes/questionWrapBuilder";
import fileQuestBuilder from "../pageTypes/fileQuestBuilder";
import FinalPageBuilder from "../pageTypes/finalPageBuilder";
import sendRequest from "../utils/sendRequest";

const pageMap = {
  check: CheckQuestBuilder,
  radio: RadioQuestBuilder,
  imgRadio: ImgRadioQuestBuilder,
  rangeNumber: rangeNumberQuestBulder,
  file: fileQuestBuilder
};

function pageManager({ startPage, pages, finalPage }, container) {
  let currentPageIndex = -1,
    result = new FormData(),
    selectedOptions = [],
    logicFlag = false,
    startLogic,
    endLogic;

  // let questionWrapper = document.getElementById("question-wrapper");
  goStartPage();

  function goStartPage() {
    startPage.onReady = goNextQuestion;

    let startPageDOM = StartPageBuilder(startPage);

    container.append(startPageDOM);

    // document.querySelector(".button-svg").viewBox.baseVal.width = 24;
    // document.querySelector(".button-svg").viewBox.baseVal.height = 24;
  }

  function getBtnsConfig() {
    if (pages[currentPageIndex]) {
      let wrapConfig = {
        onClickNext: goNextQuestion,
        onClickPrev: goPrevQuestion,
        quizTitle: startPage.title,
        pagesCount: pages.length,
        pageIndex: currentPageIndex
      };
      if (currentPageIndex === 0) wrapConfig.prevDisable = 1;
      if (
        pages[currentPageIndex].questionType !== "rangeNumber" &&
        pages[currentPageIndex].questionType !== "check" &&
        pages[currentPageIndex].questionType !== "file"
      ) {
        if (!selectedOptions[currentPageIndex]) {
          wrapConfig.nextDisable = 1;
        }
      }

      let quiz = document.getElementById("quiz");
      quiz.prepend(QuestionWrapBuilder(wrapConfig));
    }
  }

  function goNextQuestion() {
    let quiz = document.getElementById("quiz");
    quiz.innerHTML = "";
    if (pages.length <= 0) return;

    if (currentPageIndex === -1 || !pages[currentPageIndex].logic)
      currentPageIndex++;
    else {
      startLogic = currentPageIndex;
      endLogic = currentPageIndex + pages[currentPageIndex].logic.logicLength;
      if (
        pages[currentPageIndex].logic.logicOption ===
        selectedOptions[currentPageIndex].selectedOption - 1
      ) {
        currentPageIndex++;
        logicFlag = true;
      } else {
        currentPageIndex += pages[currentPageIndex].logic.logicLength + 1;
        logicFlag = false;
      }
    }

    getBtnsConfig();
    let questionWrapper = document.getElementById("question-wrapper");
    if (questionWrapper) questionWrapper.innerHTML = "";

    flipQuestion();
  }

  function goPrevQuestion() {
    let quiz = document.getElementById("quiz");
    quiz.innerHTML = "";
    if (pages.length <= 0) return;

    if (logicFlag) currentPageIndex--;
    else {
      if (currentPageIndex - 1 === endLogic)
        currentPageIndex -= endLogic - startLogic + 1;
      else currentPageIndex--;
    }
    getBtnsConfig();
    let questionWrapper = document.getElementById("question-wrapper");
    if (questionWrapper) questionWrapper.innerHTML = "";

    flipQuestion();
  }

  function flipQuestion() {
    let questionWrapper = document.getElementById("question-wrapper");
    if (questionWrapper) questionWrapper.innerHTML = "";

    let currentPage = pages[currentPageIndex];

    if (currentPage) {
      currentPage.onReady = handleReady;
      if (selectedOptions[currentPageIndex]) {
        currentPage.selectedOption =
          selectedOptions[currentPageIndex].selectedOption;
      }
      let questionDomObj = getPageType()(currentPage);

      let questionWrapper = document.getElementById("question-wrapper");
      questionWrapper.append(questionDomObj);
    }

    if (currentPageIndex >= pages.length) goFinalPage();
  }

  function goFinalPage() {
    let quiz = document.getElementById("quiz");
    quiz.innerHTML = "";

    finalPage.onReady = endQuiz;

    let finalPageDOM = FinalPageBuilder(finalPage);
    quiz.append(finalPageDOM);

    for (var pair of result.entries()) {
      console.log(pair);
    }
  }

  function endQuiz(obj) {
    // result[currentPageIndex] = {};
    result.set("Имя", obj.nameValue);
    result.set("Телефон", obj.telValue);

    // result[currentPageIndex].question = "Имя и телефон";
    // result[currentPageIndex].answer = obj.nameValue + ", " + obj.telValue;

    let requestURL = "send.php";
    // sendRequest("POST", requestURL, result);

    let xhr = new XMLHttpRequest();
		xhr.open("POST", "send.php");
		// "https://xn--80a0acdi.xn--p1ai/send.php"
		xhr.send(result);
  }

  let checkString = "",
    checkedOptions = [];

  function handleReady({ answer, question, selectedOption }) {
    selectedOptions[currentPageIndex] = {};

    if (pages[currentPageIndex].questionType == "file")
      result.append(question, answer);
    else result.set(question, answer);

    selectedOptions[currentPageIndex].question = question;

    if (pages[currentPageIndex].questionType == "check") {
      checkString = checkString + answer + ", ";
      // selectedOptions[currentPageIndex].answer = checkString;
      result.set(question, checkString);
      checkedOptions.push(selectedOption);
      selectedOptions[currentPageIndex].selectedOption = checkedOptions;
      // console.log(checkedOptions, selectedOptions);
    } else {
      //   result[currentPageIndex].answer = answer;
      selectedOptions[currentPageIndex].selectedOption = selectedOption;
    }

    if (
      pages[currentPageIndex].questionType == "rangeNumber" ||
      pages[currentPageIndex].questionType == "check" ||
      pages[currentPageIndex].questionType == "file"
    )
      return;
    else goNextQuestion();
  }

  function getPageType() {
    return pageMap[pages[currentPageIndex].questionType];
  }
}

export default pageManager;
