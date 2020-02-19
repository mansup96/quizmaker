import createElem from "./createElem";

function createHTMLBranch(array, initialElem) {
  array.forEach((node, i) => {
    if (typeof node === "string") {
      initialElem.append(node);
      return;
    }
    let elem = createElem(node);
    initialElem.append(elem);
    if (node.childNodes instanceof Array) {
      createHTMLBranch(node.childNodes, elem);
    }
	})
	
	return initialElem; 
}

export default createHTMLBranch;
