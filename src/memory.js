import { toLocalStorage, items } from "./storage";
import { taskTemplate, myProjectTasks } from "./index";
import { generateTask } from "./actions"

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
    const projects = document.querySelectorAll('.project-item')
    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove('active');
    }

    projects.forEach(project => {
        console.log(typeof(project.children[1].htmlFor))
        if (project.children[1].htmlFor == newItem.id.toString) {
            console.log(project)
        }
    })
}

function saveTask(projectName, newTaskName) {
    let newSubTask = {};

    newSubTask.name = newTaskName;
    newSubTask.className = projectName.htmlFor;
    console.log(items)

    items.forEach(item => {
        if (item.id === parseInt(projectName.htmlFor)) {
            item.subItem.push(newSubTask);
            toLocalStorage();
        } 
    })
    let projectEl = document.querySelector('.active');
    // console.log(`'${projectEl.children[1].innerText}' has 'active' class`)
}

function loadTask(activeProject) {
    if (myProjectTasks) {
        const myProjectTasks = document.querySelector('.my-project-tasks')
        items.forEach(item => {
            if (item.id === parseInt(activeProject.htmlFor)) {
                item.subItem.forEach(task => {
                    const taskItem = document.importNode(taskTemplate.content, true);
                    const textArea = taskItem.querySelector('textarea');
                    textArea.value = task.name;
                    textArea.setAttribute('readonly', 'true');
                    myProjectTasks.appendChild(taskItem);
                })
            }
        })
    } if (myProjectTasks.children.length < 1) {
        console.log('debugging a bug that produce duplicate task')
        const projectName = document.querySelectorAll('.active')[0].children[1]
        generateTask(projectName, '')
    }
}

export { saveProject, saveTask, loadTask }