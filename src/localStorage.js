import { projectTemplate, displayProjects } from "./index";
// import { save, clear, items } from "./save";

function fromLocalStorage(itemsInLocalStorage) {
    if(localStorage.getItem('todolist')) {
        clear()
        itemsInLocalStorage = JSON.parse(localStorage.getItem('todolist'))
        for (let i = 0; i < itemsInLocalStorage.length; i++) {
            console.log(itemsInLocalStorage)
            const projectElement = document.importNode(projectTemplate.content, true);
            const label = projectElement.querySelector('label');
            label.htmlFor = itemsInLocalStorage[i].id;
            label.append(itemsInLocalStorage[i].name);
            displayProjects.appendChild(projectElement);
            // console.log(items)
            items = itemsInLocalStorage;
            
        }
    }
    console.log(items)
}

function toLocalStorage() {
    console.log(items)
    localStorage.setItem('todolist', JSON.stringify(items));
}

let items = JSON.parse(localStorage.getItem('todolist')) || [];

function save(newItemFromUser) {
    let newItem = {};
    if (newItemFromUser != '') {
        console.log(newItemFromUser)
        newItem.name = newItemFromUser;
        newItem.id = new Date().valueOf();
        newItem.complete = false;
        newItem.subItem = [];
        items.push(newItem);
        toLocalStorage();
    }
}

function clear() {
    items = [];
    displayProjects.innerHTML = '';
}

export { fromLocalStorage, toLocalStorage, save }