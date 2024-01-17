import { title, submitProjectButton, myProjects, myProjectTasks } from "./index";

function changeLanguage(choice) {
    console.log('change language here')
    if (choice == 'gaeilge') {
        title.innerText = 'LIOSTA A DHÉANAMH';
        submitProjectButton.innerText = 'TIONSCADAL NUA';
        myProjects.innerText = 'MO THIONSCADAIL';
        myProjectTasks.innerText = 'TASCANNA TIONSCADAIL';
        
    } else if(choice == 'english') {
        title.innerText = 'TO DO LIST';
        submitProjectButton.innerText = 'NEW PROJECT';
        myProjects.innerText = 'MY PROJECTS';
        myProjectTasks.innerText = 'MY PROJECT TASKS';
    }
}

export { changeLanguage }