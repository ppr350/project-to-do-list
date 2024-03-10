import { fromLocalStorage, toLocalStorage } from "./storage";
import { clickedOnProjectSection, clickedOnTaskSection } from "./clickEvents";
import { infoTemplate, infoDialog, projectDescription, projectDueDate, priorityButtons, doneButton } from "./index";
import { saveTask, saveInfo } from "./memory";
import { getDate } from "date-fns";

function generateInfoButton(project) {
    const btn = document.createElement('BUTTON')
    btn.classList.add('add-info')
    const btnText = document.createTextNode('i')
    btn.appendChild(btnText)
    project.appendChild(btn)
    btn.addEventListener('click', function(e) {
        e.preventDefault()
        getInfo(project)
    })
}

function getInfo(project) {

    let info = []

    infoDialog.showModal();
    doneButton.addEventListener('click', function() {

        let getDescription
        console.log(projectDescription.value)
        getDescription = projectDescription.value

        let getDueDate
        console.log(projectDueDate.value)
        getDueDate = projectDueDate.value

        let getPriority
        for (const priorityButton of priorityButtons) {
            if (priorityButton.checked) {
                console.log(priorityButton.value)
                getPriority = priorityButton.value
                break
            }
        }
        info = [getDescription, getDueDate, getPriority]
        console.log(info)
        // processInfo(info, project)
        saveInfo(project, info)
    })




}

function processInfo(info, project) {
    const infoElement = document.importNode(infoTemplate.content, true)
    const projectInfo = infoElement.firstElementChild
    console.log(info)
    console.log(projectInfo)


    for (let i = 0; i < info.length; i++) {
        projectInfo.children[i].innerText = info[i]
        console.log(projectInfo.children[i])
    }
    project.appendChild(infoElement)
    saveInfo(info, project)
    

}


export { generateInfoButton }