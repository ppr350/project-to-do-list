import { forEach, nth } from "lodash";
import { projectTemplate, displayProjects, checkBox, taskTemplate, myProjectTasks } from "./index";

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

function clickedOnProjectSection(item) {
    console.log(`the clicked item is a project element inside the 'projects' div`)
    if (item.matches('[type="checkbox"]')) {
        toggleProjectIsComplete(item);
        console.log(`and it is a checkbox`)

        // show delete option //
        return;
    } if (item.parentElement.classList.contains('project-item')) {
        if (item.parentElement.classList.contains('active')) {
            console.log('this project is already active')
        } else {
            myProjectTasks.innerHTML = '';
            activeProject(item);
            console.log(`and it is a project, it has an '${item.childNodes[1].classList}' class as well as an 'active' class`)
        }

    } else {
        console.log(`it is other items in this container`)
    }
}

function clickedOnTaskSection(item) {
    if (item.matches('[type="checkbox"]')) {
        // toggleProjectIsComplete(item);
        console.log(`and it is a checkbox`)

        // show delete option //
        return;
    } if (document.getElementsByClassName('active').length !== 0) {
        console.log('active project available');
        const projectName = document.querySelectorAll('.active')[0].children[1]
        console.log(projectName);
        
        // const projectTask = document.querySelectorAll('.my-project-tasks')
        const textArea = document.querySelectorAll('.task-textarea')
        const isReadOnly = myProjectTasks.lastElementChild.children[1].children[0]
        console.log(isReadOnly.readOnly)
        if (isReadOnly.readOnly == false) {
            console.log(`The last textarea in tasks section is empty.`)
            return;
        } if (isReadOnly.readOnly == true) {
            generateTasks(projectName)
            console.log(`The last textarea in tasks section is not empty.`)
            return;
        }
        console.log(textArea)
        // code here to add new textarea
    } else {
        console.log('no active project')
        return;
    }
}

function toggleProjectIsComplete(checkBoxItem) {
    const parentElement = checkBoxItem.parentElement;
    const completedItem = parentElement.querySelector(':nth-child(2)')
    items.forEach(item => {
        if (item.id == completedItem.htmlFor) {
            item.isComplete = !item.isComplete;
            console.log(`'isComplete' is now '${item.isComplete}'`)

            // code here to line through all tasks in textarea and check all checbox inside that project //
        }
    })
    toLocalStorage();
}

function activeProject(targetProject) {
    console.log(targetProject)
    const projects = document.querySelectorAll('.project-item')
    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove('active');

        // code here to remove project's tasks content when removing 'active' class //
    }
    targetProject.parentElement.classList.add('active');
    // code here to display project's task when adding 'active' class //

    console.log(targetProject)
    console.log(targetProject.parentElement)
    loadTask(targetProject);
    // generateTasks(targetProject);

}

function saveProject(newItemFromUser) {
    let newItem = {};
    if (newItemFromUser != '') {
        newItem.name = newItemFromUser;
        newItem.id = new Date().valueOf();
        newItem.isComplete = false;
        newItem.subItem = [];
            
        items.push(newItem);
        console.log(newItem)
        toLocalStorage();
    }
}

// function showTasks(fromTargetedProject) {
//     console.log(`'${fromTargetedProject.innerText}' is now passed on to 'showTasks' function`)
//     const taskItem = document.querySelectorAll('.task-item');
    
//     // const textArea = taskItem.getElementByTagName('textarea')

//     console.log(taskItem)
//     console.log(fromTargetedProject)
//     console.log(`this project's label is '${fromTargetedProject.innerText}' and its id is ${fromTargetedProject.htmlFor}`)
//     generateTasks(fromTargetedProject)


//     // if (document.querySelector('.task-item')) {
//     //     const taskItem = document.querySelectorAll('.task-item')
//     //     console.log(taskItem)
//     //     const textArea = taskItem.querySelector('textarea')
//     //     if (textArea.value != '') {
//     //         console.log('task(s) exist')

//     //         taskItem.forEach(task => console.log(task))
//     //     } else {
//     //         console.log('no task')
//     //     }

//     // } else {
//     //     console.log('task(s) does not exist')

//     // }
// }

function generateTasks(projectName) {
    // remove other project's task(s) before populating the task area with active project's task
    console.log(projectName)


    console.log(document.querySelectorAll('.my-project-tasks')[0])
    

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

function loadTask(activeProject) {
    
    console.log(activeProject.htmlFor);
    const myProjectTasks = document.querySelector('.my-project-tasks')
    console.log(myProjectTasks)
    items.forEach(item => {
        if (item.id === parseInt(activeProject.htmlFor)) {
            item.subItem.forEach(task => {
                console.log(task);
                const taskItem = document.importNode(taskTemplate.content, true);
                const textArea = taskItem.querySelector('textarea');
                textArea.value = task.name;
                console.log(textArea)
                textArea.setAttribute('readonly', 'true');
                myProjectTasks.appendChild(taskItem);
            })
        }
    })
}

function saveTask(projectName, newTaskName) {
    let newSubTask = {};

    newSubTask.name = newTaskName;
    newSubTask.className = projectName.htmlFor;

    items.forEach(item => {
        if (item.id === parseInt(projectName.htmlFor)) {
            // console.log(projectName)
            // console.log(item.id, projectName.htmlFor)
            item.subItem.push(newSubTask);
            toLocalStorage();
        }
        let projectEl = document.querySelector('.active');
        console.log(`'${projectEl.children[1].innerText}' has 'active' class`)
    } )
}

function reloadPage() {
    console.log('reload page')
    items = [];
    displayProjects.innerHTML = '';
    myProjectTasks.innerHTML = '';
}



export { fromLocalStorage, toLocalStorage,clickedOnProjectSection, clickedOnTaskSection, activeProject, generateTasks, saveProject }