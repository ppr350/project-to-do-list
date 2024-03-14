import { toLocalStorage, items } from "./storage"
import { activateProject, toggleProjectIsComplete, generateTask } from "./actions"
import { myProjectTasks } from "./index"
import { last } from "lodash";
import { loadInfo } from "./memory";

function clickedOnProjectSection(item) {
    console.log(`the clicked item is a project element inside the 'projects' div`)
    if (item.matches('[type="checkbox"]')) {

        myProjectTasks.innerHTML = '';

        activateProject(item.nextElementSibling)
        toggleProjectIsComplete(item);
        console.log(`and it is a checkbox`)

        // show delete option //
        return;

    } else if (item.classList.contains('delete-project')) {
        console.log('delete project button')
    } else if (item.parentElement.classList.contains('project-item')) {
        if (item.parentElement.classList.contains('active')) {
            console.log('this project is already active')
            console.log(item.children.length > 1)
            if (item.children.length > 1) {
                let firstChild = item.querySelector('.project-name')
                firstChild.nextElementSibling.remove()
            } else if (item.children.length == 1) {
                loadInfo(item)
            }
        } else {
            myProjectTasks.innerHTML = '';
            console.log(document.querySelectorAll('.project-name'))
            if (document.querySelectorAll('.project-name').nextElementSibling) {
                console.log(document.querySelectorAll('.project-name').nextElementSibling)
                document.querySelectorAll('.project-name').nextElementSibling.remove()
            }
            activateProject(item);
        }
    } else {
        console.log(`it is other items in this container`)
    }
}

function clickedOnTaskSection(e) {
    const task = e.target
    console.log(`User clicked on a '${(task.tagName.toLowerCase())}' that has '${task.className || task.id}' class name / id.`)

    if (task.matches('[type="checkbox"]')) {
        console.log(`and it is a checkbox`)
        console.log(task)
        const projectName = document.querySelectorAll('.active')[0].children[1]
        if (task.nextElementSibling.children[0].value == '' || projectName.previousElementSibling.checked == true) {
            e.preventDefault()

        } else {
            // show delete option //
            console.log('check/unchecked task')
            // console.log(item.nextElementSibling.childNodes[1].classList)
            const itemClass = task.nextElementSibling.childNodes[1]
            console.log(itemClass.value)
            if (myProjectTasks.lastElementChild.children[1].children[0].readOnly == false) {
                myProjectTasks.lastElementChild.remove()
            }
            items.forEach(item => {
                if (item.id == itemClass.classList) {
                    for (let i = 0; i < item.subItem.length; i++) {
                        if (item.subItem[i].name == itemClass.value) {
                            console.log(item.subItem[i])
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

        const textArea = document.querySelectorAll('.task-textarea')
        const lastTaskIsReadOnly = myProjectTasks.lastElementChild.children[1].children[0]

        console.log(`Clicked task is ${task.value}.`)
        if (task.nodeName != 'TEXTAREA' && !task.matches('[type="checkbox"]')) {
            if (lastTaskIsReadOnly.readOnly == false && lastTaskIsReadOnly.value == '') {
                console.log(`The last textarea in tasks section is empty.`)
                const firstTaskIsReadOnly = myProjectTasks.firstElementChild.children[1].children[0]
                if (firstTaskIsReadOnly.readOnly == true) {
                    lastTaskIsReadOnly.parentElement.parentElement.remove()
                }
            } else if (lastTaskIsReadOnly.readOnly == true && projectName.previousElementSibling.checked != true) {
                console.log(`The last textearea readonly status is ${lastTaskIsReadOnly.readOnly}, which means it has value in it. Therefore a new textarea is generated.`)
                generateTask(projectName, '')
                console.log(projectName)
            } else if (lastTaskIsReadOnly.value != '' && projectName.previousElementSibling.checked != true) {
                generateTask(projectName, '')
            }

        } else if (task.nodeName == 'TEXTAREA') {
            console.log(`The last task is ${lastTaskIsReadOnly.value}.`)
            const allTextArea = document.querySelectorAll('.task-textarea')
            allTextArea.forEach(textArea => {
                if (textArea.value != '') {
                    textArea.setAttribute('readonly', 'true')
                }
            })
            if (lastTaskIsReadOnly.readOnly == false) {
                const taskContainer = task.parentElement.parentElement.parentElement
                console.log(task.value, taskContainer.lastElementChild.children[1].children[0])
                console.log(taskContainer.lastElementChild)

                if (task.value != taskContainer.lastElementChild.children[1].children[0].value) {
                    task.removeAttribute('readonly');
                    console.log('not the last element')
                    if (lastTaskIsReadOnly.value == '') {
                        lastTaskIsReadOnly.parentNode.parentNode.remove();
                    }
                    if (lastTaskIsReadOnly.value != '') {
                        lastTaskIsReadOnly.setAttribute('readonly', 'true')
                    }

                    console.log(textArea)
                    let thisItem = task.parentElement.parentElement
                    let index = 0;
                    while (thisItem.previousElementSibling) {
                        index += 1
                        thisItem = thisItem.previousElementSibling                       
                    }
                    console.log(`Previous total element is ${index}.`)
                    
                    task.addEventListener('keydown', function(e) {
                    if (e.keyCode == 13 && task.value != '') {
                        e.preventDefault();    
                        items.forEach(itemOnLocalStorage => {
                            if (itemOnLocalStorage.id === parseInt(projectName.htmlFor)) {
                                itemOnLocalStorage.subItem[index].name = task.value;                             
                                toLocalStorage();
                            }
                            let projectEl = document.querySelector('.active');
                            console.log(`Project name '${projectEl.children[1].innerText}' has 'active' class`)
                        })
                        task.setAttribute('readonly', 'true');
                        }
                    })

                }

            } else if (lastTaskIsReadOnly.readOnly == true) {

                console.log('User wants to edit task')
                console.log(`item is '${task.value}' and readonly status is ${task.readOnly}.`)
                generateTask(projectName, task)
            }

        }
    } else {
        console.log('no active project')
        console.log(e)
    }
}

export { clickedOnProjectSection, clickedOnTaskSection }