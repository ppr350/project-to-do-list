import { toLocalStorage, items } from "./storage";
import { taskTemplate, myProjectTasks, infoTemplate, displayProjects, myProjects } from "./index";
import { activateProject, generateTask } from "./actions"
import { generateProjectDeleteButton, generateTaskDeleteButton } from "./delete";

function saveProject(newItemFromUser) {
    let newItem = {};
    if (newItemFromUser != '') {
        newItem.name = newItemFromUser;
        newItem.id = new Date().valueOf();
        newItem.isComplete = false;
        newItem.subItem = [];
        newItem.info = [];
            
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

function saveInfo(project, info) {
    let newInfo = {}
    newInfo.description = info[0]
    newInfo.dueDate = info[1]
    newInfo.priority = info[2]
    console.log(newInfo)
    console.log(project.children[1])

    items.forEach(item => {
        if (item.id === parseInt(project.children[1].htmlFor)) {
            // item.info.push(newInfo)
            console.log(item)
            item.info = (newInfo)
            toLocalStorage()
        }
    })
}

function loadInfo(activeProject) {

    // DOM
    // const projectItems = document.querySelectorAll('.project-item')
    // console.log(projectItems)
    // for (let i = 0; i < projectItems.length; i++) {
    //     // if (projectContainer.children[i].contains('.project-info')) {
    //     //     console.log('found existing info')
    //     // }
    //     console.log(projectItems[i].children[1])
    //     const project = projectItems[i].children[1]
    //     if (project.children.length > 2) {
    //         console.log('found existing info')
            
    //         // let projectInfo = projectItems[i].getElementsByClassName('project-info')
    //         // console.log(projectInfo.parentElement)
    //         // console.log(projectItems[i].getElementsByClassName('project-info'))
    //         // projectItems[i].querySelectorAll('.project-info').remove()
    //         project.removeChild(children[1])
    //     }
    // }
    const projects = document.querySelectorAll('.project-name')
    Array.from(projects).forEach(project => {
        if (project.nextElementSibling) {
            let sibling = project.nextElementSibling
            let parent = project.parentElement

            project.nextElementSibling.remove()
        }
    })
    

    // localStorage
    items.forEach(item => {
        console.log(item.id)


        if (item.id === parseInt(activeProject.htmlFor)) {

            const infoElement = document.importNode(infoTemplate.content, true)
            const projectInfo = infoElement.firstElementChild
            console.log(activeProject)

            console.log(projectInfo)
            let itemInfoArray = new Array()
            itemInfoArray[0] = item.info.description
            itemInfoArray[1] = item.info.dueDate
            itemInfoArray[2] = item.info.priority
            console.log(itemInfoArray)
            for (let i = 0; i < itemInfoArray.length; i++) {
                if (itemInfoArray[i] !== undefined) {
                    projectInfo.children[i].innerText = itemInfoArray[i]
                }
            }
            activeProject.appendChild(infoElement)
        }

    })
}

function saveTask(projectName, newTaskName) {
    let newSubTask = {};

    newSubTask.name = newTaskName;
    newSubTask.className = projectName.htmlFor;
    newSubTask.isComplete = false;
    console.log(items)

    items.forEach(item => {
        if (item.id === parseInt(projectName.htmlFor)) {
            item.subItem.push(newSubTask);
            toLocalStorage();
        } 
    })
}

function loadTask(activeProject) {
    if (myProjectTasks) {
        const myProjectTasks = document.querySelector('.my-project-tasks')
        items.forEach(item => {
            if (item.id === parseInt(activeProject.htmlFor)) {
                item.subItem.forEach(task => {
                    const taskItem = document.importNode(taskTemplate.content, true);
                    const textArea = taskItem.querySelector('textarea');
                    const taskCheckbox = taskItem.querySelector('.checkbox')

                    textArea.value = task.name;
                    textArea.classList = task.className;
                    textArea.setAttribute('readonly', 'true');
                    task.isComplete == true ? taskCheckbox.checked = true : taskCheckbox.checked = false

                    // generateTaskDeleteButton(taskItem)
                    

                    myProjectTasks.appendChild(taskItem);
                })
            }
        })
    } if (myProjectTasks.children.length < 1) {
        console.log('the task area is empty so a new textarea is created')
        const projectName = document.querySelectorAll('.active')[0].children[1]
        generateTask(projectName, '')
    }
}

export { saveProject, saveInfo, loadInfo, saveTask, loadTask }