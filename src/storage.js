import { projectTemplate, displayProjects, checkBox } from "./index";

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
    localStorage.setItem('todolist', JSON.stringify(items));
}

function clickedOnProjectSection(item) {
    if (item.matches('[type="checkbox"]')) {
        toggleProjectIsComplete(item);
    } else {
        console.log('not a checkbox')
    }
    
}

function toggleProjectIsComplete(checkBoxItem) {
    const parent = checkBoxItem.parentElement;
    const completedItem = parent.querySelector(':nth-child(2)')
    items.forEach(item => {
        if (item.id == completedItem.htmlFor) {
            item.isComplete = !item.isComplete;
        }
    })
    toLocalStorage();
}

// function selectProject() {
//     if (item.matches('[type='))
// }

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



export { fromLocalStorage, toLocalStorage,clickedOnProjectSection, save }