import { projectTemplate, displayProjects } from "./index";

let items = JSON.parse(localStorage.getItem('todolist')) || [];

function fromLocalStorage(itemsInLocalStorage) {
    if(localStorage.getItem('todolist')) {
        reloadPage()
        itemsInLocalStorage = JSON.parse(localStorage.getItem('todolist'))
        for (let i = 0; i < itemsInLocalStorage.length; i++) {
            const projectElement = document.importNode(projectTemplate.content, true);
            const label = projectElement.querySelector('label');
            label.htmlFor = itemsInLocalStorage[i].id;
            label.append(itemsInLocalStorage[i].name);
            displayProjects.appendChild(projectElement);
            items = itemsInLocalStorage;          
        }
    }
}

function toLocalStorage() {
    console.log(items)
    localStorage.setItem('todolist', JSON.stringify(items));
}

function save(newItemFromUser) {
    let newItem = {};
    if (newItemFromUser != '') {
        newItem.name = newItemFromUser;
        newItem.id = new Date().valueOf();
        newItem.isComplete = false;
        newItem.subItem = [];
        items.push(newItem);
        toLocalStorage();
    }
}

function reloadPage() {
    items = [];
    displayProjects.innerHTML = '';
}



export { fromLocalStorage, toLocalStorage, save }