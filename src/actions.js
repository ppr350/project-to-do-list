import { forEach, indexOf, nth, templateSettings } from "lodash";
import { toLocalStorage, items, reloadPage, fromLocalStorage } from "./storage";
import { taskTemplate, myProjectTasks, } from "./index";
import { saveTask, loadTask } from "./memory";
import { generateProjectDeleteButton, generateTaskDeleteButton } from "./delete"

function activateProject(targetProject) {
    const projects = document.querySelectorAll('.project-item')
    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove('active');
    }
    targetProject.parentElement.classList.add('active');
    // generateProjectDeleteButton(targetProject)
    loadTask(targetProject)
}

function toggleProjectIsComplete(checkBoxItem) {
    const parentElement = checkBoxItem.parentElement;
    const completedItem = parentElement.querySelector(':nth-child(2)')
    items.forEach(item => {
        if (item.id == completedItem.htmlFor) {
      
            item.isComplete = !item.isComplete;
            if (item.isComplete && item.subItem != '') {
                completedItem.classList.add('completed')

                const subItem = item.subItem
                subItem.forEach(task => {
                    task.isComplete = true                        
                })

                const subTasks = document.getElementsByClassName(item.id)
                console.log(subTasks)
                for (let i = 0; i < subTasks.length; i++) {
                    const subTaskCheckBoxes = subTasks[i].parentElement.previousElementSibling
                    subTaskCheckBoxes.checked = true
                }
                
            } else if (!item.isComplete) {
                completedItem.classList.remove('completed')

                const subItem = item.subItem
                subItem.forEach(task => {
                    task.isComplete = false
                })

                const subTasks = document.getElementsByClassName(item.id)
                console.log(subTasks)
                for (let i = 0; i < subTasks.length; i++) {
                    const subTaskCheckBoxes = subTasks[i].parentElement.previousElementSibling
                    subTaskCheckBoxes.checked = false
                }

            }
            
            console.log(`'isComplete' is now '${item.isComplete}'`)
        }
    })
    toLocalStorage();
}

function generateTask(projectName, item) {
    if (item.readOnly == true) {
        item.removeAttribute('readonly');
        let thisItem = item.parentElement.parentElement
        let index = 0;
        while (thisItem.previousElementSibling) {
            index += 1
            thisItem = thisItem.previousElementSibling                    
        }
        console.log(index)
        item.addEventListener('keydown', function(e) {
            console.log(item.value)
            if (e.keyCode == 13 && item.value.length == 1) {
                e.preventDefault();
                e.stopImmediatePropagation()
                console.log(item.parentElement.parentElement)
                item.parentElement.parentElement.remove()
                toLocalStorage()
            }

            else if (e.keyCode == 13 && item.value != '') {
                e.preventDefault();
                e.stopImmediatePropagation()

                items.forEach(itemInLocalStorage => {
                        if (itemInLocalStorage.id === parseInt(projectName.htmlFor)) {
                            console.log(itemInLocalStorage)
                            itemInLocalStorage.subItem[index].name = item.value;
                            console.log(itemInLocalStorage.subItem[index].name)
                            console.log(items)
                            console.log('first level')
                            toLocalStorage()
                        }
                    })
                    item.setAttribute('readonly', 'true');
                    item.blur()
                    console.log(item)
                    
            }
        }, true)

    } else if (item.value == undefined) {

        if (item.readOnly == undefined) {

            const taskSection = document.importNode(taskTemplate.content, true);
            const textArea = taskSection.querySelector('textarea');

            myProjectTasks.appendChild(taskSection);
            textArea.focus();

            textArea.addEventListener('keydown', function(e) {
                if (e.keyCode == 13 && textArea.value != '' && item.readOnly !== true) {
                    console.log(`sub task is ${textArea.value}`);
                    textArea.setAttribute('readonly', 'true');
                    saveTask(projectName, textArea.value)
                    textArea.blur()
                    // loadTask(projectName)
                }
            })
        } else if (item.readOnly == true) {
            console.log('diagnose problem')
        }
    } else {
        console.log('the end of code')
    }
}

export { activateProject, toggleProjectIsComplete, generateTask }