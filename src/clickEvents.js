import { toLocalStorage, items } from "./storage"
import { activateProject, toggleProjectIsComplete, generateTask } from "./actions"
import { myProjectTasks } from "./index"
import { last } from "lodash";

function clickedOnProjectSection(item) {
    console.log(`the clicked item is a project element inside the 'projects' div`)
    if (item.matches('[type="checkbox"]')) {

        myProjectTasks.innerHTML = '';
        activateProject(item.nextElementSibling)
        toggleProjectIsComplete(item);
        console.log(`and it is a checkbox`)

        // show delete option //
        return;

    } else if (item.parentElement.classList.contains('project-item')) {
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

function clickedOnTaskSection(e) {
    const item = e.target
    console.log(`User clicked on a '${(item.tagName.toLowerCase())}' that has '${item.className || item.id}' class name / id.`)

    if (item.matches('[type="checkbox"]')) {
        console.log(`and it is a checkbox`)
        console.log(item)
        const projectName = document.querySelectorAll('.active')[0].children[1]
        if (item.nextElementSibling.children[0].value == '' || projectName.previousElementSibling.checked == true) {
            e.preventDefault()

        } else {
            // show delete option //
            console.log('check/unchecked task')
            // console.log(item.nextElementSibling.childNodes[1].classList)
            const itemClass = item.nextElementSibling.childNodes[1].classList
            items.forEach(item => {
                if (item.id == itemClass) {
                    console.log(item)
                    for (let i = 0; i < item.subItem.length; i++) {
                        if (item.subItem[i].name = itemClass.value) {
                            console.log(item.subItem[i])
                            // item.subItem[i].isComplete = true
                            item.subItem[i].isComplete = !item.subItem[i].isComplete
                            toLocalStorage()
                        }
                    }
                }
            })
            
        }

        
    } else if (document.getElementsByClassName('active').length !== 0) {
        console.log('active project available');
        const projectName = document.querySelectorAll('.active')[0].children[1]
        // console.log(projectName.innerHTML);

        const textArea = document.querySelectorAll('.task-textarea')
        const lastTaskIsReadOnly = myProjectTasks.lastElementChild.children[1].children[0]


        console.log(projectName) // currently active project
        // console.log(textArea) // full task textarea
        console.log(`Clicked task is ${item.value}.`) // clicked item
        if (item.nodeName != 'TEXTAREA') {
            if (lastTaskIsReadOnly.readOnly == false && lastTaskIsReadOnly.value == '') {
                console.log(`The last textarea in tasks section is empty.`)
            } else if (lastTaskIsReadOnly.readOnly == true && projectName.previousElementSibling.checked != true) {
                console.log(`The last textearea readonly status is ${lastTaskIsReadOnly.readOnly}, which means it has value in it. Therefore a new textarea is generated.`)
                generateTask(projectName, '')
            } else if (lastTaskIsReadOnly.value != '' && projectName.previousElementSibling.checked != true) {
                generateTask(projectName, '')
            }

        } else if (item.nodeName == 'TEXTAREA') {
            // if (document.activeElement != item) document.activeElement.blur();
            // const lastTaskIsReadOnly = myProjectTasks.lastElementChild.children[1].children[0]
            console.log(`The last task is ${lastTaskIsReadOnly.value}.`)
            const allTextArea = document.querySelectorAll('.task-textarea')
            allTextArea.forEach(textArea => {
                if (textArea.value != '') {
                    textArea.setAttribute('readonly', 'true')
                }
            })
            if (lastTaskIsReadOnly.readOnly == false) {
                const taskContainer = item.parentElement.parentElement.parentElement
                console.log(item.value, taskContainer.lastElementChild.children[1].children[0])
                console.log(taskContainer.lastElementChild)

                // if (item.value == taskContainer.lastElementChild.children[1].children[0].value) {
                //     console.log('clicked on the last element')                  
                //     return
                // } else 
                if (item.value != taskContainer.lastElementChild.children[1].children[0].value) {
                    item.removeAttribute('readonly');
                    console.log('not the last element')
                    if (lastTaskIsReadOnly.value == '') {
                        lastTaskIsReadOnly.parentNode.parentNode.remove();
                    }
                    if (lastTaskIsReadOnly.value != '') {
                        lastTaskIsReadOnly.setAttribute('readonly', 'true')
                    }

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

            } else if (lastTaskIsReadOnly.readOnly == true) {

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