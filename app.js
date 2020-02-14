let div = document.createElement("div"),
  container = document.querySelector(".container");
div.className = "red";
div.innerHTML = "Привет, епта!";
// body.append(div);

function divCreate(classList, id) {
  let elem = document.createElement("div");
  if (typeof classList === "object")
    for (let i = 0; i < classList.length; i++) {
      elem.classList.add(classList[i]);
		}
	else elem.classList.add(classList)
	elem.id = id
	return elem
}



console.log(divCreate(['класс1', 'класс2'], 'id'));
