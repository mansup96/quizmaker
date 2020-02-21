export default function createElem({
  tag,
  classList,
  attrs,
  value,
  onclick
} = {}) {
  let elem = document.createElement(tag);
  if (classList instanceof Array) {
    classList.forEach(className => {
      elem.classList.add(className);
    });
  } else {
    elem.classList.add(classList);
  }
  for (let key in attrs) {
    elem.setAttribute(key, attrs[key]); 
  }
  if (value) {
    elem.innerHTML = value;
  }
  if (onclick) {
    elem.addEventListener("click", onclick);
  }
  return elem;
}
