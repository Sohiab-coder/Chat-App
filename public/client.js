const sokit = io();

let textArea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

let userName;

do {
  userName = prompt("Enter your name");
} while (!userName);

textArea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: userName,
    message: message.trim(),
  };

  appendHtml(msg, "outgoing");
  textArea.value = "";
  sokit.emit("message", msg);
  scrollTobottom();
}

function appendHtml(msg, type) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add(type, "message");
  const markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

sokit.on("recive", (msg) => {
  appendHtml(msg, "incoming");
  scrollTobottom();
});

function scrollTobottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
