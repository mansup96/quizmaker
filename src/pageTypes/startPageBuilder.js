function startPageBuilder({ title, subtitle, imgSrc, buttonValue, onReady }) {
  let schema = [
    {
      tag: "div",
      classList: "quiz-wrapper",
      childNodes: [
        {
          tag: "div",
          classList: "img-wrapper",
          childNodes: [
            {
              tag: "img",
              classList: "start-page-img",
              attrs: {
                src: imgSrc
              }
            }
          ]
        },
        {
          tag: "div",
          classlist: "start-page-sidebar",
          childNodes: [
            { tag: "h2", classList: "title", value: title },
            { tag: "h3", classList: "subtitle", value: subtitle },
            {
              tag: "div",
              classList: "start-button",
              onclick: () => onReady(),
              childNodes: [
                {
                  tag: "p",
                  classList: "button-value",
                  value: buttonValue
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  return schema;
}

export default startPageBuilder;
