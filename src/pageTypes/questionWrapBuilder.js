function questionWrapBuilder({ onClickPrev, onClickNext }) {
  let schema = [
    {
      tag: "div",
      classList: "question-wrapper",
      attrs: { id: "question-wrapper" }
    },
    {
      tag: "div",
      classList: "footer",
      childNodes: [
        {
          tag: "button",
          classList: "prev-button",
          value: "назад",
          // attrs: { disabled: "disabled" },
          onclick: () => onClickPrev()
        },
        {
          tag: "button",
          classList: "next-button", 
          value: "вперед",
          // attrs: { disabled: "disabled" },
          onclick: () => onClickNext()  
        }
      ]
    }
  ];
  return schema;
}

export default questionWrapBuilder;
