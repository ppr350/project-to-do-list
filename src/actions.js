import { forEach, indexOf, nth, templateSettings } from "lodash";
import { toLocalStorage, items } from "./storage";
import { taskTemplate, myProjectTasks, } from "./index";
import { saveTask, loadTask } from "./memory";

function activateProject(targetProject) {
    const projects = document.querySelectorAll('.project-item')
    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove('active');
    }
    targetProject.parentElement.classList.add('active');
    // const projectName = document.querySelectorAll('.active')[0].children[1]
    loadTask(targetProject)
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

        // let enterPressed = false

            if (e.keyCode == 13 && item.value != '') {
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