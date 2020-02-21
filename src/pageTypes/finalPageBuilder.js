import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function finalPageBuilder({ title, subtitle, imgSrc, buttonValue, onReady }) {
	let finalPageWrapper = ElemCreator({ tag: "div", classList: "startPage-wrapper" });
  let schema = [
    {
      tag: "h1",
      classList: "quiz-wrapper",
			value: 'Конец'
		},
		{
			tag: 'div',
			value: 'нажми',
			onclick: () => onReady()
		}
  ];
	let finalPage = CreateHTML(schema, finalPageWrapper)
	return finalPage
}

export default finalPageBuilder;