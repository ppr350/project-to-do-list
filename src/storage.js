import { projectTemplate, displayProjects, checkBox, taskTemplate, myProjectTasks } from "./index";

let items = JSON.parse(localStorage.getItem('todolist')) || [];

function fromLocalStorage(itemsInLocalStorage) {
    if(localStorage.getItem('todolist')) {
        reloadPage()
        itemsInLocalStorage = JSON.parse(localStorage.getItem('todolist'))
        for (let i = 0; i < itemsInLocalStorage.length; i++) {
            const projectElement = document.importNode(projectTemplate.content, true);
            const projectLabel = projectElement.querySelector('label');
            projectLabel.htmlFor = itemsInLocalStorage[i].id;
            projectLabel.append(itemsInLocalStorage[i].name);
            displayProjects.appendChild(projectElement);
            items = itemsInLocalStorage;     
            
            const taskElement = document.importNode(taskTemplate.content, true);
            const taskLabel = taskElement.querySelector('label');
            const textArea = taskLabel.querySelectorAll('.task-textarea')
            // add taskLabel id here //
            for (let j = 0; j < itemsInLocalStorage[j].subItem.length; j++) {
                textArea.value = itemsInLocalStorage[j].subItem;
                console.log(taskLabel)
            }
            
            myProjectTasks.appendChild(taskElement)
        }
    }
}

function toLocalStorage() {
    localStorage.setItem('todolist', JSON.stringify(items));
}

function clickedOnProjectSection(item) {
    if (item.matches('[type="checkbox"]')) {
        toggleProjectIsComplete(item);
        // show delete option //
    } if (item.parentElement.classList.contains('project-item')) {
        activeProject(item);
    } else {
        console.log(item)
    }
}

function toggleProjectIsComplete(checkBoxItem) {
    const parentElement = checkBoxItem.parentElement;
    const completedItem = parentElement.querySelector(':nth-child(2)')
    items.forEach(item => {
        if (item.id == completedItem.htmlFor) {
            item.isComplete = !item.isComplete;
        }
    })
    toLocalStorage();
}

function activeProject(targetProject) {
    const projects = document.querySelectorAll('.project-item')
    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove('active');
        // code here to remove project's tasks content when removing 'active' class //
    }
    targetProject.parentElement.classList.add('active');
    // code here to display project's task when adding 'active' class //
    console.log(targetProject)
    showTasks(targetProject);
}

function saveProject(newItemFromUser) {
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

function showTasks(fromTargetedProject) {
    if (document.querySelector('.task-item')) {
        console.log('task(s) exist')

    } else {
        console.log('task(s) does not exist')
        generateTasks(fromTargetedProject);
    }
}

function generateTasks(projectName) {
    const tasks = document.importNode(taskTemplate.content, true);
    const textArea = tasks.querySelector('textarea');
    myProjectTasks.appendChild(tasks);
    textArea.addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            // console.log(textArea.value);
            saveTask(projectName, textArea.value);
            textArea.setAttribute('readonly', 'true');
            // console.log(projectName)
        }
    })
}

function saveTask(project, newTask) {
    // console.log(project)
    // for (let i = 0; i < items.length; i++) {

    //     if (items[i].id = project.htmlFor) {
    //         console.log(items[i].id)
    //         console.log(parseInt(project.htmlFor));
    //         console.log(items[i].subItem);
    //     }
        
    // }
    // console.log(newTask)
    items.forEach(item => {
        if (item.id == parseInt(project.htmlFor)) {
            console.log(item.id, project.htmlFor)
            item.subItem.push(newTask);
            toLocalStorage();
        }
    } )
}

function reloadPage() {
    items = [];
    displayProjects.innerHTML = '';
}



export { fromLocalStorage, toLocalStorage,clickedOnProjectSection, activeProject, saveProject }