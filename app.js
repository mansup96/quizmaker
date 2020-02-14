let container = document.querySelector(".container");

function createElem(tag, classList, attrs, innerHTML = "") {
  let elem = document.createElement(tag);
  if (Array.isArray(classList)) elem.classList.add(...classList);
  else elem.classList.add(classList);
  for (let key in attrs) {
    elem.setAttribute(key, attrs[key]);
  }
  elem.innerHTML = innerHTML;
  return elem;
}

function createHTMLBranch(array, initialElem) {
  array.forEach((node, i) => {
    if (node instanceof Object && !(array[i + 1] instanceof Array))
      console.log("dom");
		initialElem.append(node);
		debugger
    if (node instanceof Array) {
      let innerBranch = node;
      console.log(innerBranch);

      if (array[i-1] !== undefined)
			createHTMLBranch(innerBranch, array[i-1])
			// debugger;
    }
  });
}

createHTMLBranch(
  [
    createElem("div", "start-page", { id: "start-page" }),
    [
      [
        createElem("img", "start-page-img", {
          src:
            "https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,h_650/sgp59amwpq4agwdvk5z6.jpg"
        }),
        createElem("div", "new-class", { id: "idishnik" }),
        [
          createElem("div", "title", { id: "title" }),
          createElem("div", "sub-title", { id: "sub-title" })
        ]
      ]
    ]
  ],
  container
);
