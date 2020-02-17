function radioPageBuilder({ onReady, questionsCount, question, options }) {
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
          tag: "ul",
          classList: "option-list",
          childNodes: options.map((item, i) => {
            let option = {
              tag: "li",
              classList: "option",
              value: item,
              attrs: { id: i.toString() },
              onclick: () => onReady(item)
            };
            return option;
          })
        }
      ]
    }
  ];
  return schema;
}

export default radioPageBuilder;
