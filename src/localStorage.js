let items = JSON.parse(localStorage.getItem('todolist')) || [];
const userInput = document.querySelector('#user-input-project');

function fromLocalStorage(items) {
    console.log('from local storage')
    if(localStorage.getItem('todolist')) {
        // clearPage();
        items = JSON.parse(localStorage.getItem('todolist'));

        for (let i = 0; i < items.length; i++) {
            const projectElement = document.importNode(projectTemplate.content, true);
            const label = projectElement.querySelector('label');
            label.htmlFor = items[i].id;
            label.append(items[i].name);
            displayProjects.appendChild(projectElement);
            items = items;
            console.log('from LocalStorage')
        }
    }
}

function toLocalStorage() {
    console.log(items)
    localStorage.setItem('todolist', JSON.stringify(items));
}

export { fromLocalStorage, toLocalStorage }