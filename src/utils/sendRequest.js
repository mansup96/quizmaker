let requestURL = "https://jsonplaceholder.typicode.com/users";

function sendRequest(method, URL, body = null) {
  return fetch(URL, {
    method,
    body: body,
    headers: { "Content-Type": false }
  });
  // .then(response => {
  //   response.text().then(value => console.log(value));

  //   // return response.json();

  //   // return response.then(error => {
  //   //   let e = new Error("Что-то пошло не так");
  //   //   e.data = error;
  //   //   throw e;
  //   // });
  // });
}

// sendRequest("post", requestURL, { Name: "Mans", age: 23 })
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// sendRequest("GET", requestURL)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

export default sendRequest;
