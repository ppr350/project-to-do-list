// import { toLocalStorage, fromLocalStorage } from "./localStorage";
// import { displayProjects, } from ".";

// let items = JSON.parse(localStorage.getItem('todolist')) || [];

// function save(newItemFromUser) {
//     let newItem = {};
//     if (newItemFromUser != '') {
//         console.log(newItemFromUser)
//         newItem.name = newItemFromUser;
//         newItem.id = new Date().valueOf();
//         newItem.complete = false;
//         newItem.subItem = [];
//         items.push(newItem);
//         toLocalStorage();
//     }
// }

// function clear() {
//     items = [];
//     displayProjects.innerHTML = '';
// }

// Factory Function to create item //
// function saveItem(item, id) {
//     return {
//         item,
//         id,
//         complete: false,
//         subItem: [],
//     }
// }

// let save01 = saveItem("sleep", "sleep-id")
// console.log(save01)
// export { save, clear, items }