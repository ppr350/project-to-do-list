import { toLocalStorage, items } from "./storage"
import { activateProject, toggleProjectIsComplete, generateTask } from "./actions"
import { myProjectTasks } from "./index"

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
            activateProject(item);
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

        
    } else if (document.getElementsByClassName('active').length !== 0) {
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
            } else if (lastTaskIsReadOnly.readOnly == true) {
                console.log(`The last textearea readonly status is ${lastTaskIsReadOnly.readOnly}, which means it has value in it. Therefore a new textarea is generated.`)
                generateTask(projectName, '')
            }

        } else if (item.nodeName == 'TEXTAREA') {
            const lastTaskIsReadOnly = myProjectTasks.lastElementChild.children[1].children[0]
            if (lastTaskIsReadOnly.readOnly == false) {
                const taskContainer = item.parentElement.parentElement.parentElement
                console.log(item.value, taskContainer.lastElementChild.children[1].children[0])
                console.log(`The last element on the task list is ${taskContainer.lastElementChild}.`)

                if (item.value == taskContainer.lastElementChild.children[1].children[0].value) {
                    console.log('clicked on the last element')                  
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
                    console.log(`Previous total element is ${index}.`)
                    
                    item.addEventListener('keydown', function(e) {
                    if (e.keyCode == 13 && item.value != '') {
                        e.preventDefault();    
                        items.forEach(itemOnLocalStorage => {
                            if (itemOnLocalStorage.id === parseInt(projectName.htmlFor)) {
                                itemOnLocalStorage.subItem[index].name = item.value;                             
                                toLocalStorage();
                            }
                            let projectEl = document.querySelector('.active');
                            console.log(`Project name '${projectEl.children[1].innerText}' has 'active' class`)
                        })
                        item.setAttribute('readonly', 'true');
                        }
                    })

                }

            } else if (item.readOnly == true) {
                console.log('User wants to edit task')
                console.log(`item is '${item.value}' and readonly status is ${item.readOnly}.`)
                generateTask(projectName, item)
            }

        }
    } else {
        console.log('no active project')
    }
}

export { clickedOnProjectSection, clickedOnTaskSection }