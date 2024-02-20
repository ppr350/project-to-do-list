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
    const projectName = document.querySelectorAll('.active')[0].children[1]
    loadTask(targetProject)
    console.log(myProjectTasks.children.length < 1)    
    if (myProjectTasks.children.length < 1) {
        console.log('debugging a bug that produce duplicate task')
        generateTask(projectName, '')
    }
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
    console.log(projectName)
    console.log(item)
    console.log(item.readOnly)
    console.log(document.querySelectorAll('.my-project-tasks')[0])

    if (item.readOnly === true) {
        item.removeAttribute('readonly');
        let thisItem = item.parentElement.parentElement
        let index = 0;
        while (thisItem.previousElementSibling) {
            index += 1
            thisItem = thisItem.previousElementSibling                    
        };
        console.log(index)
        item.addEventListener('keydown', function(e) {
            if (e.keyCode == 13 && item.value != '') {
                e.preventDefault();

               items.forEach(itemInLocalStorage => {
                    if (itemInLocalStorage.id === parseInt(projectName.htmlFor)) {
                        console.log(itemInLocalStorage)
                        itemInLocalStorage.subItem[index].name = item.value;
                        console.log(itemInLocalStorage.subItem[index].name)
                        console.log(items)
                        toLocalStorage()
                    }
                })
                item.setAttribute('readonly', 'true');
                console.log(item)
            }
        })

    }
    else if (item.readOnly === undefined && item === '') {
        const taskSection = document.importNode(taskTemplate.content, true);
        const textArea = taskSection.querySelector('textarea');

        myProjectTasks.appendChild(taskSection);
        textArea.focus();
        textArea.addEventListener('keydown', function(e) {
            if (e.keyCode == 13 && textArea.value != '') {
                e.preventDefault();
                console.log(`sub task is ${textArea.value}`);
                textArea.setAttribute('readonly', 'true');
                saveTask(projectName, textArea.value)
            }

        })
        return
        
    }
}

export { activateProject, toggleProjectIsComplete, generateTask }