const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);
  
  updateStorage();

  inputBox.addEventListener("keyup", updateStorage);
  img.addEventListener("click", function() {
    inputBox.remove();
    updateStorage();
  });
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "img") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName.toLowerCase() === "p") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
      nt.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

showNotes();
