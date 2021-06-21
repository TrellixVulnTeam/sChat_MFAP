const socket = io();

while (!username) {
    var username = prompt("Wie lautet Ihr Name?");
}

socket.on("init", (results) => {
    results.forEach((result) => {
        appendMessage(`${result.username}: ${result.message}`);
    });

    appendMessage("Sie sind beigetreten");
    socket.emit("new-user", username);
});

socket.on("chat-message", (data) => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
    appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
    appendMessage(`${name} disconnected`);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        appendMessage(`Sie: ${input.value}`);
        socket.emit("send-chat-message", input.value);
        input.value = "";
    }
});

function appendMessage(msg) {
    var listitem = document.createElement("li");
    var span = document.createElement("span");
    span.textContent = msg;
    span.className = "listitem-text";
    listitem.appendChild(span);
    messages.appendChild(listitem);
    window.scrollTo(0, document.body.scrollHeight);
}
