import { fromLocalStorage, toLocalStorage } from "./storage";
import { clickedOnProjectSection, clickedOnTaskSection } from "./clickEvents";
import { infoDialog, projectDescription, projectDueDate, priorityButtons, doneButton } from "./index";

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

function getInfo() {
    infoDialog.showModal();
    doneButton.addEventListener('click', function() {

        let getDescription
        console.log(projectDescription.value)
        getDescription = projectDescription.value
        projectDescription.value = ''

        let getDate
        console.log(projectDueDate)

        let getPriority
        for (const priorityButton of priorityButtons) {
            if (priorityButton.checked) {
                console.log(priorityButton.value)
                getPriority = priorityButton.value
                break
            }
        }
        
    })

}

export { generateInfoButton }