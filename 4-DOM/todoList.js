const todoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");
let items = [];

function updateItems() {
  // list.innerHTML = "<li>anything</li> <li>anything 2</li> <li>anything 3</li>"

  const html = items
    .map(
      (item) =>
        `<li class="todo-item">
            <input value="${item.id}" type="checkbox" 
              ${item.completed ? "checked" : ""}  
            />
            <span class="itemName">${item.name}</span>
            <button class="remove-item" value="${item.id}"> X </button>
         </li>`
    )
    .join("");

  // console.log(html);

  list.innerHTML = html;

  saveToLocalStorage();
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  updateItems();
}

function toogleItem(id) {
  const itemToToogle = items.find((item) => item.id === id);
  itemToToogle.completed = !itemToToogle.completed;
  updateItems();
}

list.addEventListener("click", function (e) {
  console.log(e.target)
  const id = parseInt(e.target.value);

  if (e.target.matches("button")) {
    deleteItem(id);
  } else if (e.target.matches('input[type="checkbox"]')) {
    toogleItem(id);
  }
});

function saveToLocalStorage() {
  console.info("Saving items to localstorage");
  localStorage.setItem("items", JSON.stringify(items));
}

const handleSubmit = (e) => {
  e.preventDefault();

  console.log("submit");

  const name = e.currentTarget.item.value;

  if (!name) return;

  const item = {
    id: Date.now(),
    name: name,
    completed: false,
  };

  items.push(item);

  e.currentTarget.reset();

  console.log(items);

  updateItems();
};

function restoreFromLocalStorage() {
  console.info("Restoring from LS");
  // pull the items from LS
  const lsItems = JSON.parse(localStorage.getItem("items"));
  if (lsItems && lsItems.length) {
    items = lsItems;
    updateItems();
  }
}

restoreFromLocalStorage()

todoForm.addEventListener("submit", handleSubmit);
