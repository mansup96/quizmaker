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
  if (pages.length <= 0) {
    return;
  }

  let currentPageIndex = -1;
  let result = [];

  function handleReady(answer) {
    result[currentPageIndex] = answer;

    goNext();
  }

  function goNext() {
    currentPageIndex++;

    const currentPage = pages[currentPageIndex];

    if (currentPage) {
      container.innerHTML = "";
      const pageConfig = getPageBuilder(currentPage)({
        ...currentPage,
        onReady: handleReady
      });

      createHTMLBranch(pageConfig, container);

      return;
    }

    goFinalPage();
  }

  function goFinalPage() {
    container.innerHTML = "";
    createHTMLBranch(
      [
        {
          tag: "div",
          childNodes: result.map((item, idx) => ({
            tag: "h1",
            value: `Page${idx}: ${item}`
          }))
        }
      ],
      container
    );
  }

  function getPageBuilder(pageConfig) {
    return pageMap[pageConfig.questionType];
  }

  goNext();
}

export default pageManager;
