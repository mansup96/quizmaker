function radioQuestBuilder({ onReady, questionsCount, question, options }) {
  let schema = [
    {
      tag: "div",
      classList: "title-question",
      childNodes: [{ tag: "p", classList: "question", childNodes: [question] }]
    },
    {
      tag: "div",
      classList: "options-container",
      childNodes: options.map((item, i) => {
        let option = {
          tag: "div",
          classList: "option",
          attrs: { id: i.toString() },
          onclick: () => onReady(item),
          childNodes: [
            {
              tag: "img",
              classList: "option-img",
              attrs: { src: item.imgSrc }
            },
            { tag: "p", classList: "option-descr", value: item.optionDescr }
          ]
        };
        return option;
      })
    }
  ];
  return schema;
}

export default radioQuestBuilder;
