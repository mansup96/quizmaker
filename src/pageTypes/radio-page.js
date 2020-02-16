function radioPage({ onReady, questionsCount, question, options }) {
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

let schema = {
  questionsCount: 7,
  question: "Какой утюг предпочитаете?",
  options: ["Красивый", "афыва", "йцукецй", "смичсмттчсм", "щшщнгшд"]
};

export default radioPage;
