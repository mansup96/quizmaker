import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function questionWrapBuilder({
  onClickPrev,
  onClickNext,
  prevDisable,
  nextDisable,
  quizTitle,
  pagesCount,
  pageIndex
}) {
  let questionWrap = ElemCreator({ tag: "div", classList: "quiz-inner" });

  let step = 100 / pagesCount,
    readyWidth = step * pageIndex;

  let schema = [
    {
      tag: "div",
      classList: "quiz-top",
      childNodes: [
        {
          tag: "div",
          classList: "quiz-title-wrapper",
          childNodes: [
            {
              tag: "span",
              classList: "title-icon",
              value: `<svg viewBox="0 0 24 24" class="button-svg">
											<title>mdi-file-document-box-check-outline</title>
											<path d="M17,21L14.25,18L15.41,16.84L17,18.43L20.59,14.84L21.75,16.25M12.8,21H5C3.89,21 3,20.11 
													3,19V5C3,3.89 3.89,3 5,3H19C20.11,3 21,3.89 21,5V12.8C20.39,12.45 19.72,12.2 19,12.08V5H5V19H12.08C12.2,19.72 
													12.45,20.39 12.8,21M12,17H7V15H12M14.68,13H7V11H17V12.08C16.15,12.22 15.37,12.54 14.68,13M17,9H7V7H17" fill='#a4cc00'>
											</path>
									</svg>`
            },
            {
              tag: "p",
              classList: "quiz-title",
              value: quizTitle
            }
          ]
        },
        {
          tag: "div",
          classList: "question-wrapper",
          attrs: { id: "question-wrapper" }
        }
      ]
    },
    {
      tag: "div",
      classList: "footer",
      childNodes: [
        {
          tag: "div",
          classList: "progressbar-wrapper",
          childNodes: [
            {
              tag: "div",
              classList: "progressbar__label",
              value: "Готово:",
              childNodes: [
                {
                  tag: "span",
                  classList: "ready-value",
                  value: " " + Math.round(readyWidth).toString() + "%" 
                }
              ]
            },
            {
              tag: "div",
              classList: "progressbar__field",
              childNodes: [
                {
                  tag: "span",
                  classList: "progressbar__ready",
                  attrs: {
                    style: `width:${readyWidth}%`
                  }
                }
              ]
            }
          ]
        },
        {
          tag: "div",
          classList: "buttons",
          childNodes: [
            {
              tag: "button",
              classList: "prev-button",
              onclick: () => onClickPrev(),
              childNodes: [
                {
                  tag: "div",
                  classList: "prev-button-icon",
                  value: `<svg fill="#4a505e" x="0px" y="0px" viewBox="0 0 31.49 31.49" xml:space="preserve" 
											class="is-back">
													<path 
													data-v-f63d6478="" 
															d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,
															0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,
															1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,
															0-1.571L21.205,5.007z">
													</path>
											</svg>`
                }
              ]
            },
            {
              tag: "button",
              classList: "next-button",
              onclick: () => onClickNext(),
              childNodes: [
                {
                  tag: "div",
                  classList: "next-button-icon",
                  value: `<svg fill="#4a505e" x="0px" y="0px" viewBox="0 0 31.49 31.49" xml:space="preserve" 
											class="is-back">
													<path 
													data-v-f63d6478="" 
															d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,
															0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,
															1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,
															0-1.571L21.205,5.007z">
													</path>
											</svg>`
                },
                {
                  tag: "span",
                  classList: "next-button-text",
                  value: "Далее"
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  let questionWrapElem = CreateHTML(schema, questionWrap),
    prevBtn = questionWrapElem.querySelector(".prev-button"),
    nextBtn = questionWrapElem.querySelector(".next-button");

  if (prevDisable) {
    prevBtn.setAttribute("disabled", 1);
  }
  if (nextDisable) {
    nextBtn.setAttribute("disabled", 1);
  }

  return questionWrapElem;
}

export default questionWrapBuilder;
