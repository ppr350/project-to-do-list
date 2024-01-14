import { items, projectTemplate, displayProjects } from "./index";

function fromLocalStorage(storeItems) {
    if(localStorage.getItem('todolist')) {
        // clearPage();
        // items = JSON.parse(localStorage.getItem('todolist'));

        for (let i = 0; i < storeItems.length; i++) {
            const projectElement = document.importNode(projectTemplate.content, true);
            const label = projectElement.querySelector('label');
            label.htmlFor = storeItems[i].id;
            label.append(storeItems[i].name);
            displayProjects.appendChild(projectElement);
            items = storeItems;
        }
    }
}

function toLocalStorage() {
    console.log(items)
    localStorage.setItem('todolist', JSON.stringify(items));
}

export { fromLocalStorage, toLocalStorage }