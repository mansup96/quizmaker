import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function filePageBuilder({ onReady, question, options, selectedOption }) {
  let questWrapper = ElemCreator({ tag: "div", classList: "wrapper" });
  let schema = [
    {
      tag: "div",
      classList: "title-question",
      childNodes: [{ tag: "p", classList: "question", childNodes: [question] }]
    },
    {
      tag: "div",
      classList: "options-container",
      childNodes: [
        {
          tag: "input",
          attrs: { type: "file" },
          classList: "file-input"
        }
      ]
      // options.map((item, i) => {
      //   let option = {
      //     tag: "div",
      //     classList: "answer-radio",
      //     attrs: { id: i.toString() },
      //     onclick: () =>
      //       onReady({
      //         question: question,
      //         answer: item,
      //         selectedOption: i + 1
      //       }),
      //     childNodes: [
      //       {
      //         tag: "span",
      //         classList: "answer-text",
      //         value: item
      //       }
      //     ]
      //   };
      //   if (selectedOption && i == selectedOption - 1)
      //     option.classList = ["answer-radio", "selected"];
      //   return option;
      // })
    }
  ];
  let fileQuestion = CreateHTML(schema, questWrapper);
  let fileInput = fileQuestion.querySelector(".file-input");
  fileInput.addEventListener("change", () => {
    console.log(fileInput.files);
  });

  return fileQuestion;
}

export default filePageBuilder;
