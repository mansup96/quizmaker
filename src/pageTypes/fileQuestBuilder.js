import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function filePageBuilder({ onReady, question, selectedOption }) {
  let questWrapper = ElemCreator({ tag: "div", classList: "wrapper" });
  let schema = [
    {
      tag: "div",
      classList: "title-question",
      childNodes: [{ tag: "p", classList: "question", childNodes: [question] }]
    },
    {
      tag: "div",
      classList: ["options-container", "file-question"],
      childNodes: [
        {
          tag: "input",
          attrs: { type: "file", multiple: "" },
          classList: "file-input"
        },
        {
          tag: "span",
          classList: "input-error",
          value: ""
        }
      ]
    }
  ];
  let fileQuestion = CreateHTML(schema, questWrapper),
    $fileInput = fileQuestion.querySelector(".file-input"),
    $error = fileQuestion.querySelector(".input-error");

  $fileInput.addEventListener("change", () => {
    let filesSize = 0;
    for (let i = 0; i < $fileInput.files.length; i++) {
      filesSize += $fileInput.files[`${i}`].size;
    }

    filesSize / 1024 / 1024 > 10
      ? ($error.innerHTML = "Размер файлов не должен превышать 10 Мб")
      : ($error.innerHTML = "");

    onReady({ question, answer: $fileInput.files[0], selectedOption: null });
  });

  return fileQuestion;
}

export default filePageBuilder;
