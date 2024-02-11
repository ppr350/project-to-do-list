import { forEach, indexOf, nth } from "lodash";
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

console.log('save new data to localStorage')
function toLocalStorage() {
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
    console.log(`User clicked on a '${(item.tagName.toLowerCase())}' that has '${item.className || item.id}' class name / id.`)
    if (item.matches('[type="checkbox"]')) {
        // toggleProjectIsComplete(item);
        console.log(`and it is a checkbox`)
        if (item.nextElementSibling.children[0].value == '') {
            console.log('no value')
            item.checked = false
        } else {
            // show delete option //
            console.log('check/unchecked task')
        }

        
        return;
    } if (document.getElementsByClassName('active').length !== 0) {
        console.log('active project available');
        const projectName = document.querySelectorAll('.active')[0].children[1]
        console.log(`Project name is '${projectName.innerText}'.`);

        const textArea = document.querySelectorAll('.task-textarea')
        const lastTaskIsReadOnly = myProjectTasks.lastElementChild.children[1].children[0]


        console.log(projectName) // currently active project
        console.log(textArea) // full task textarea
        console.log(item) // clicked item
        if (item.nodeName != 'TEXTAREA') {
            if (lastTaskIsReadOnly.readOnly == false) {
                console.log(`The last textarea in tasks section is empty.`)
                return;
            } else if (lastTaskIsReadOnly.readOnly == true) {
                console.log(`The last textearea readonly status is ${lastTaskIsReadOnly.readOnly}, which means it has value in it. Therefore a new textarea is generated.`)
                generateTasks(projectName)
                return;
            }
            console.log(textArea)
            
        } else if (item.nodeName == 'TEXTAREA') {
            const lastTaskIsReadOnly = myProjectTasks.lastElementChild.children[1].children[0]
            if (lastTaskIsReadOnly.readOnly == false) {
                // console.log('item is a textarea and readonly is false')
                // console.log(item.value)
                const taskContainer = item.parentElement.parentElement.parentElement
                console.log(taskContainer)
                console.log(item.value, taskContainer.lastElementChild.children[1].children[0].value)

                // const taskParent = item.parentElement.parentElement
                console.log(taskContainer.lastElementChild)
                if (item.value == taskContainer.lastElementChild.children[1].children[0].value) {
                    console.log('last element')                  
                    return
                } else if (item.value != taskContainer.lastElementChild.children[1].children[0].value) {
                    item.removeAttribute('readonly');
                    
                    console.log('not the last element')
                    lastTaskIsReadOnly.parentNode.parentNode.remove();
                    console.log(textArea)
                    let thisItem = item.parentElement.parentElement
                    let index = 0;
                    while (thisItem.previousElementSibling) {
                        index += 1
                        thisItem = thisItem.previousElementSibling                       
                    }
                    console.log(`Previous total task is ${index}.`)
                    
                    item.addEventListener('keydown', function(e) {
                    if (e.keyCode == 13 && item.value != '') {
                        e.preventDefault();    
                        // const allTasks = item.parentElement.parentElement.parentElement.querySelectorAll('.task-item')
                        // console.log(allTasks[index])
                        items.forEach(itemOnLocalStorage => {
                            if (itemOnLocalStorage.id === parseInt(projectName.htmlFor)) {
                                itemOnLocalStorage.subItem[index].name = item.value;
                                
                                toLocalStorage();
                            }
                            let projectEl = document.querySelector('.active');
                            console.log(`'${projectEl.children[1].innerText}' has 'active' class`)
                        })
                        
                        // projectName.
    
                        item.setAttribute('readonly', 'true');
                        }
                    })

                }

            } else if (item.readOnly == true) {
                console.log('User wants to edit task')
                item.removeAttribute('readonly');
                let thisItem = item.parentElement.parentElement
                let index = 0;
                while (thisItem.previousElementSibling) {
                    index += 1
                    thisItem = thisItem.previousElementSibling                    
                }
                console.log(`Previous total task is ${index}.`)
                
                // console.log(item)
                item.addEventListener('keydown', function(e) {
                if (e.keyCode == 13 && item.value != '') {
                    e.preventDefault();
                    // const allTasks = item.parentElement.parentElement.parentElement.querySelectorAll('.task-item')

                    // console.log(allTasks[index])
                    items.forEach(itemOnLocalStorage => {
                        if (itemOnLocalStorage.id === parseInt(projectName.htmlFor)) {
                            console.log(itemOnLocalStorage)
                            itemOnLocalStorage.subItem[index].name = item.value;
                            console.log(itemOnLocalStorage.subItem[index].name)
                            console.log(items)
                            toLocalStorage();
                        }
                        let projectEl = document.querySelector('.active');
                        console.log(`'${projectEl.children[1].innerText}' has 'active' class`)
                    })
                    item.setAttribute('readonly', 'true');
                    }
                })
            }
            return;
        }
        
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
    const projects = document.querySelectorAll('.project-item')
    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove('active');

        // code here to remove project's tasks content when removing 'active' class //
    }
    targetProject.parentElement.classList.add('active');
    const projectName = document.querySelectorAll('.active')[0].children[1]
    loadTask(targetProject)
    console.log(myProjectTasks.innerHTML)
    if (myProjectTasks.innerHTML === '') {
        console.log('debugging a bug that produce duplacte task')
        generateTasks(projectName)
    }
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
        console.log(newItem.id.toString())
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
        // if (project.children[1].htmlFor === newItem.id) {
        //     items.parentElement.classList.add('active');
        // }
        // console.log(itemOnLocalStorage)
    })
}

function generateTasks(projectName) {
    // remove other project's task(s) before populating the task area with active project's task
    console.log(projectName)


    console.log(document.querySelectorAll('.my-project-tasks')[0])
    

    const taskSection = document.importNode(taskTemplate.content, true);
    const textArea = taskSection.querySelector('textarea');

    console.log(textArea)


    myProjectTasks.appendChild(taskSection);
    textArea.focus();
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
    
    if (myProjectTasks) {
        console.log(activeProject.htmlFor);
        const myProjectTasks = document.querySelector('.my-project-tasks')
        console.log(myProjectTasks)
        items.forEach(item => {
            if (item.id === parseInt(activeProject.htmlFor)) {
                item.subItem.forEach(task => {
                    // console.log(task);
                    const taskItem = document.importNode(taskTemplate.content, true);
                    const textArea = taskItem.querySelector('textarea');
                    textArea.value = task.name;
                    // console.log(textArea)
                    textArea.setAttribute('readonly', 'true');
                    myProjectTasks.appendChild(taskItem);
                })
            }
        })
    } else if (!myProjectTasks) {
        // generateTasks(activeProject.htmlFor)
        console.log('debugging the bug that produce duplicate task')
    }
}

function saveTask(projectName, newTaskName) {
    let newSubTask = {};

    newSubTask.name = newTaskName;
    newSubTask.className = projectName.htmlFor;
    console.log(items)

    items.forEach(item => {
        if (item.id === parseInt(projectName.htmlFor)) {
            console.log(item)
            // console.log(projectName)
            // console.log(item.id, projectName.htmlFor)
            item.subItem.push(newSubTask);
            toLocalStorage();
        }
        let projectEl = document.querySelector('.active');
        console.log(`'${projectEl.children[1].innerText}' has 'active' class`)
    })
}

function reloadPage() {
    console.log('reload page')
    items = [];
    displayProjects.innerHTML = '';
    myProjectTasks.innerHTML = '';
}



export { fromLocalStorage, toLocalStorage,clickedOnProjectSection, clickedOnTaskSection, activeProject, generateTasks, saveProject }