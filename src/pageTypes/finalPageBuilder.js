import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function finalPageBuilder({ title, imgSrc, buttonValue, onReady }) {
  let finalPageWrapper = ElemCreator({
    tag: "div",
    classList: "quiz",
    attrs: { id: "quiz" }
  });
  let schema = [
    {
      tag: "div",
      classList: "start-page",
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
          classList: "start-page-sidebar",
          childNodes: [
            {
              tag: "form",
              classList: "final-form",
              childNodes: [
                {
                  tag: "input",
                  classList: "input-name",
                  attrs: {
                    type: "text",
                    placeholder: "Ваше Имя",
										name: "name", 
										id: 'name', 
                    required: "",
                    autocomplete: "on"
                  }
                },
                {
                  tag: "input",
                  classList: "input-tel",
                  attrs: {
                    type: "tel",
                    placeholder: "Ваш телефон",
                    name: "tel",
                    required: "",
                    autocomplete: "on"
                  }
                },
                {
                  tag: "button",
                  classList: "send-button",
                  attrs: { type: "submit" },
                  // onclick: () => onClick(),
                  childNodes: [
                    {
                      tag: "span",
                      classList: "icon",
                      value: `<svg class="button-svg" viewBox="0 0 24 24">
								<title>mdi-checkbox-marked-circle-outline</title>
								<path d="M20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 
								7.58,4 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2C6.48,2 
								2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12M7.91,10.08L6.5,11.5L11,
								16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" 
								fill="#ffffff" >
								</path>
								</svg>`
                    },
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
      ]
    }
  ];

  let finalPage = CreateHTML(schema, finalPageWrapper);

  let nameInput = finalPage.querySelector(".input-name"),
    telInput = finalPage.querySelector(".input-tel"),
    button = finalPage.querySelector(".send-button"),
    formResult = {};

  nameInput.addEventListener("input", () => {
    formResult.nameValue = nameInput.value;
  });
  telInput.addEventListener("input", () => {
    formResult.telValue = telInput.value;
  });
  button.addEventListener("click", () => {
    event.preventDefault();
    if (formResult.nameValue && formResult.telValue) {
      onReady(formResult);
    }
  });

  return finalPage;
}

export default finalPageBuilder;
