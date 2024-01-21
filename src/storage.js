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
            
            
            const taskElement = document.importNode(taskTemplate.content, true);
            const taskLabel = taskElement.querySelector('label');
            const textArea = taskLabel.querySelectorAll('.task-textarea')
            // add taskLabel id here //
            if (itemsInLocalStorage[i].subItem != null) {
                console.log('subtask(s) exists in localStorage and being loaded to the tasks section')
                for (let j = 0; j < itemsInLocalStorage[j].subItem.length; j++) {
                    const tasks = document.importNode(taskTemplate.content, true);
                    const textArea = tasks.querySelector('textarea');

                    textArea.value = itemsInLocalStorage[j].subItem;
                    console.log(textArea.value)

                    // add other elements such as due date and priority

                    // console.log(taskLabel)
                    myProjectTasks.appendChild(taskElement)

                    // add a new empty textarea under existing task(s)
                }
            } else {
                console.log(`no task in project '${itemsInLocalStorage[i].name}' yet`)

            }
            


            items = itemsInLocalStorage;     
        }
    }
}

function toLocalStorage() {
    localStorage.setItem('todolist', JSON.stringify(items));
}

function clickedOnProjectSection(item) {
    console.log(`the clicked item is a project element inside the 'projects' div.`)
    if (item.matches('[type="checkbox"]')) {
        toggleProjectIsComplete(item);
        console.log(`and it is a checkbox.`)

        // show delete option //
        return;
    } if (item.parentElement.classList.contains('project-item')) {
        activeProject(item);
        console.log(`and it is a project, it has an '${item.childNodes[1].classList}' class as well as an 'active' class.`)
    } else {
        console.log(`it is other items in this container.`)
    }
}

function clickedOnTaskSection(subItem) {
    console.log('user clicked on task\'s textarea.')
    // if (subItem.matches('textarea')) {
    //     console.log('clicked on a textarea');
    //     const projectItem = document.querySelector('.active');
    //     console.log(projectItem)
    //     generateTasks(subItem)
    // }
}

function toggleProjectIsComplete(checkBoxItem) {
    const parentElement = checkBoxItem.parentElement;
    const completedItem = parentElement.querySelector(':nth-child(2)')
    items.forEach(item => {
        if (item.id == completedItem.htmlFor) {
            item.isComplete = !item.isComplete;
            console.log(`'isComplete' is now '${item.isComplete}'`)
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
    // console.log(targetProject)
    showTasks(targetProject);
}

function saveProject(newItemFromUser) {
    let newItem = {};
    if (newItemFromUser != '') {
        newItem.name = newItemFromUser;
        newItem.id = new Date().valueOf();
        newItem.isComplete = false;
        if (newItem.subItem != null) { 
            console.log('sub tasks detected');
            // newItem.subItem = [];
        };
        items.push(newItem);
        toLocalStorage();
    }
}

function showTasks(fromTargetedProject) {
    console.log(`'${fromTargetedProject.innerText}' is now passed on to 'showTasks' function`)
    const taskItem = document.querySelectorAll('.task-item')
    // const textArea = taskItem.getElementByTagName('textarea')

    console.log(taskItem)
    generateTasks(fromTargetedProject.innerText)


    // if (document.querySelector('.task-item')) {
    //     const taskItem = document.querySelectorAll('.task-item')
    //     console.log(taskItem)
    //     const textArea = taskItem.querySelector('textarea')
    //     if (textArea.value != '') {
    //         console.log('task(s) exist')

    //         taskItem.forEach(task => console.log(task))
    //     } else {
    //         console.log('no task')
    //     }

    // } else {
    //     console.log('task(s) does not exist')

    // }
}

function generateTasks(projectName) {
    // remove other project's task(s) before populating the task area with active project's task


    console.log(document.getElementsByClassName('.my-project-tasks'))
    

    const taskSection = document.importNode(taskTemplate.content, true);
    const textArea = taskSection.querySelector('textarea');


    myProjectTasks.appendChild(taskSection);
    textArea.addEventListener('keydown', function(e) {
        if (e.keyCode == 13 && textArea.value != '') {
            e.preventDefault();
            console.log(`sub task is ${textArea.value}`);
            saveTask(projectName, textArea.value);
            textArea.setAttribute('readonly', 'true');
            // console.log(projectName)
        }
    })
}

function saveTask(project, newTask) {
    let newSubTask = {};
    console.log(project)
    items.forEach(item => {
        if (item.id == parseInt(project.htmlFor)) {
            console.log(item.id, project.htmlFor)
            newSubTask.name = newTask;
            newSubTask.setAttribute('class', item.id)
            item.subItem.push(newSubTask);
            toLocalStorage();
        }
    } )
}

function reloadPage() {
    items = [];
    displayProjects.innerHTML = '';
}



export { fromLocalStorage, toLocalStorage,clickedOnProjectSection, clickedOnTaskSection, activeProject, generateTasks, saveProject }