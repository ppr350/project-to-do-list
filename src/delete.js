import { saveTask, loadTask } from "./memory";
import { toLocalStorage, items } from "./storage";

function generateProjectDeleteButton(project) {
    const btn = document.createElement('BUTTON')
    btn.classList.add('delete-project')
    const btnText = document.createTextNode('Delete')
    btn.appendChild(btnText)
    project.appendChild(btn)
}

function generateTaskDeleteButton(task) {

}

function deleteProject(project) {

}

function deleteTask(task) {

}


export { generateProjectDeleteButton, generateTaskDeleteButton, deleteProject, deleteTask }