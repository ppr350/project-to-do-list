import { toLocalStorage } from "./localStorage";

let items = JSON.parse(localStorage.getItem('todolist')) || [];
const userInput = document.querySelector('#user-input-project');

function save(newItemFromUser) {
    let item = {};
    if (newItemFromUser != '') {
        console.log(newItemFromUser)
        item.name = newItemFromUser;
        item.id = new Date().valueOf();
        item.complete = false;
        item.subItem = [];
        items.push(item);
        toLocalStorage();
    }
}

export { save }