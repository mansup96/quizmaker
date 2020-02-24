import createHTMLBranch from "./utils/createHTMLBranch";
import radioPage from "./pageTypes/radioQuestBuilder";
import pageManager from "./utils/pageManager";

if (typeof window !== "undefined") {
  window.pageManager = pageManager;
}

let requestURL = "send.php";

function sendRequest(method, URL, body = null) {
  return fetch(URL, {
    method,
    body: body,
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    if (response.ok) return response.json();
    else
      return response.json().then(error => {
        let e = new Error("Что-то пошло не так");
        e.data = error;
        throw e;
      });
  });
}

export default sendRequest;
// sendRequest("post", requestURL, { Name: "Mans", age: 23 })
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// // sendRequest("GET", requestURL)
// //   .then(data => console.log(data))
// //   .catch(err => console.log(err));
