import { fromLocalStorage, toLocalStorage } from "./storage";
import { clickedOnProjectSection, clickedOnTaskSection } from "./clickEvents";
import { infoTemplate, infoDialog, projectDescription, projectDueDate, priorityButtons, doneButton } from "./index";

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
    infoDialog.showModal();
    doneButton.addEventListener('click', function() {

        let getDescription
        console.log(projectDescription.value)
        getDescription = projectDescription.value

        let getDate
        console.log(projectDueDate.value)
        getDate = projectDueDate.value

        let getPriority
        for (const priorityButton of priorityButtons) {
            if (priorityButton.checked) {
                console.log(priorityButton.value)
                getPriority = priorityButton.value
                break
            }
        }
    })
    displayInfo(project, getDescription, getDate, getPriority)

}

function displayInfo(getDescription, getDate, getPriority, project) {
    const infoElement = document.importNode(infoTemplate.content, true)
    const infoArray = ['description', 'dueDate', 'priority']
    const projectInfo = infoElement.firstElementChild
    const inputArray = [getDescription, getDate, getPriority]
    console.log(projectInfo)

    for (let i = 0; i < infoArray.length; i++) {
        projectInfo.children[i].innerText = infoArray[i]
        console.log(projectInfo[i])
    }
    
    

}


export { generateInfoButton }