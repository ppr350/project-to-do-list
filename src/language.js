import { title, submitProjectButton, myProjects, myTasksTitle } from "./index";

function changeLanguage(choice) {
    console.log('change language here')
    if (choice == 'gaeilge') {
        title.innerText = 'LIOSTA A DHÉANAMH';
        submitProjectButton.innerText = 'TIONSCADAL NUA';
        myProjects.innerText = 'MO THIONSCADAIL';
        myTasksTitle.innerText = 'TASCANNA TIONSCADAIL';
        
    } else if(choice == 'english') {
        title.innerText = 'TO DO LIST';
        submitProjectButton.innerText = 'NEW PROJECT';
        myProjects.innerText = 'MY PROJECTS';
        myTasksTitle.innerText = 'MY PROJECT TASKS';
    }
}

export { changeLanguage }