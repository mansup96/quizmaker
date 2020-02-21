import createElem from "./createElem";

function createDOMObj(array, initialElen) {
  console.log(array);

  let DOMWrapper = createElem({ tag: "div", classList: "dom-wrapper" });
  array.forEach((node, i) => {
    let elem = createElem(node);
		DOMWrapper.append(elem);
		
    if (node.childNodes instanceof Array) {
			createElem(node.childNodes, elem);
    }
		console.log(DOMWrapper);  
		debugger 
  });
}

export default createDOMObj;
