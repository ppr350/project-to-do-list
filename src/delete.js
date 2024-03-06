import { saveTask, loadTask } from "./memory";
import { toLocalStorage, items } from "./storage";

function generateProjectDeleteButton(project) {
    const btn = document.createElement('BUTTON')
    btn.classList.add('delete-project')
    const btnText = document.createTextNode('X')
    btn.appendChild(btnText)
    project.appendChild(btn)
    btn.addEventListener('click', function(e) {
        e.preventDefault()
        deleteProject(btn.parentElement)
    })
}

function generateTaskDeleteButton(task) {

}

function deleteProject(project) {
    console.log(project)
    console.log(`delete ${project}.`)

    project.remove()
    toLocalStorage()
}

function deleteTask(task) {

}


export { generateProjectDeleteButton, generateTaskDeleteButton, deleteProject, deleteTask }