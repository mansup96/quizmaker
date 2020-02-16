import RadioPage from "../pageTypes/radio-page";
import createHTMLBranch from "./createHTMLBranch";

const pageMap = {
  radio: RadioPage
};

// let config = {
// 	pages : [
// 		{
// 			questionType : 'radio',
// 			question: 'Как дела?',
// 			options: ['yjhv','sadfsadf','adsfas'],
// 		},
// 		{
// 			questionType : 'radio',
// 			question: 'че мутишь?',
// 			options: ['yjhv','sadfsadf','adsfas'],
// 		},
// 	]
// }

function pageManager({ pages }, container) {
  if (pages <= 0) return;

  let currentPageIndex = -1,
    result = [];

  function handleReady(answer) {
    result[currentPageIndex] = answer;

    goNext();
  }

  function goNext() {
    container.innerHTML = "";

    currentPageIndex++;

    if (pages[currentPageIndex]) {
      let currentPage = pages[currentPageIndex];

      let pageConfig = getPageBuilder(currentPage)({
        ...currentPage,
        onReady: handleReady
      });

      createHTMLBranch(pageConfig, container);
    } else goFinalPage();
  }


  goNext();

  function goFinalPage() {
    createHTMLBranch(
      [
        {
          tag: "div",
          childNodes: result.map((item, i) => {
            return {
              tag: "h1",
              value: `Page ${i} : ${item}`
            };
          })
        }
      ],
      container
    );
  }

  function getPageBuilder(currentPage) {
    return pageMap[currentPage.questionType];
  }
}

export default pageManager;
