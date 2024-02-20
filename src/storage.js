import { forEach, indexOf, nth, templateSettings } from "lodash";
import { projectTemplate, displayProjects, myProjectTasks } from "./index";

let items = JSON.parse(localStorage.getItem('todolist')) || [];

function fromLocalStorage(itemsInLocalStorage) {
    if(localStorage.getItem('todolist')) {
        reloadPage()
        console.log('pull data from localStorage')
        itemsInLocalStorage = JSON.parse(localStorage.getItem('todolist'))
        for (let i = 0; i < itemsInLocalStorage.length; i++) {
            const projectElement = document.importNode(projectTemplate.content, true);
            const projectLabel = projectElement.querySelector('label');
            projectLabel.htmlFor = itemsInLocalStorage[i].id;
            projectLabel.append(itemsInLocalStorage[i].name);
            displayProjects.appendChild(projectElement);
            items = itemsInLocalStorage;     
        }
    }
}

function toLocalStorage() {
    console.log('save new data to localStorage')
    localStorage.setItem('todolist', JSON.stringify(items));
}

function reloadPage() {
    console.log('reload page')
    items = [];
    displayProjects.innerHTML = '';
    myProjectTasks.innerHTML = '';
}


export { fromLocalStorage, toLocalStorage, reloadPage, items }