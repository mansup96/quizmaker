function rangeNumberQuestBuilder({
  onReady,
  question,
  maxValue,
  minValue,
  defaultValue
}) {
  let delta = maxValue - minValue,
    gamma = defaultValue - minValue,
    defaultWidth = (gamma * 100) / delta;
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
          classList: "range-input",
          attrs: {
            type: "number",
            min: minValue,
            max: maxValue,
            value: defaultValue
          }
        },
        {
          tag: "div",
          classList: "progressbar-wrapper",
          attrs: {
            style: "background-color: black; height: 20px; width: 100%"
          },
          childNodes: [
            {
              tag: "div",
              classList: "progress-indicakor",
              attrs: {
                style: `background-color: red; height: 20px; width: ${defaultWidth}%`
              }
            }
          ]
        }
      ]
    }
  ];
  return schema;
}

export default rangeNumberQuestBuilder;
