# project-to-do-list
# beta 1.1.1
I am looking for help:

I am sharing this project in beta to The Odin Project's Discord community in order to help locate and fix a bug:

### To reproduce the bug:
1. Write a project name in the textarea above 'MY PROJECTS  / MO THIONSCADAIL', and click 'TIONSCADAL NUA / NEW PROJECT' button
2. Your project name should appear under 'MY PROJECTS  / MO THIONSCADAIL', click on the project name and the project is now active
3. An empty textarea should appear under 'TASCANNA TIONSCADAIL / MY PROJECT TASKS'
4. Click on the textarea and write something, and press Enter
5. Click on the same textarea again to edit it, and press Enter
6. Now refresh your browser
7. Click the project name, you should see the task has been duplicated

### What solutions I have tried:
1. Tested it on FireFox and Chrome browsers
2. Instead of calling the 'saveTask' function, I wrote the code inside 'generateTasks' function, to rule out calling 'saveTask' twice when editing task
3. Used debugger to try to locate the line of code that cause the duplication
4. Console.log out each step on occasions that I know will produce the bug to tried catch the bug
5. Use stopPropagation() method to prevent further propagation of the current event
6. Use stopImmediatePropagation() method to prevent other listeners of the same event from being called. However, It was undesirable statement inside "else if" preventing the desirable statement inside "if" from running
7. Making sure "readonly = true" are in place for all textarea that have value inside


### updates on beta 1.1.1 (22th February 2024)
1. Following advice from Jonathan || saltypirate10 on The Odin Project's discord's Javascript-help-1, The project is now more modular.
    - index.js handles most HTML DOM variable objects on startUp
    - clickEvents.js listens to inputs and process them accordingly
    - storage.js handles localStorage
    - action.js generates, manipulate project and task
    - memory.js synchronises items between page and localStorage


## App Logic

### On page loads :
>
    if
    data exists in localStorage
    >
    load data from it

    else
    data doesn’t exist in localStorage 
    >
    create a new empty array to store data


### add eventListener to project container :
>
if
    user clicks on project container
    >>
    trigger project container’s eventListener
    >>
    eventListener determines what part of project container is clicked
    >>
        if
        it’s a checkbox :
        >>>
        return Boolean value ‘true’ or false

        else if
        If it’s a project name :
        >>>
        remove ‘active’ class on project in the same level if there is any,

        remove existing task(s) on the task section if there is any,

        add an “active” class on that project name,

        highlight the project name with CSS,

        display the project’s task section 
        >>>>
            if
            the task section is empty :
            >>>>>
            display an empty textarea for user to enter new task,

            display an optional description textarea for user to enter description for the new task,

            display calendar for user to select due date,

            display a radio button for user to select priority,

            addEventListener to listen to “enter”,

            get the values that user has just inputted,

            call the HTML task template, this template should contain places to store task name, checkbox, due date and priority,

            give this task the same className as its main project’s id,

            add a checkbox,

            import date.fns and use one of its libraries function to calculate due date,

            add “readonly” attribute to this task textarea and it’s description textarea,

            take data from this new task and add them to the project’s subItem array as an object,

            update the new value to localStorage,

            else if
            the task section has existing task(s) :
            >>>>>>
                if
                the existing task’s parent project is not the same project that the user has just clicked :
                >>>>>>>
                remove all existing tasks

                populate the empty task section with task that belongs to the project that was just clicked 

                if
                user clicks on an existing readonly textarea with value :
                >>>>>>>
                remove “readonly” attribute on that textarea to enable user edit the task,

                listen to user’s new value,

                update that textarea with the new value,

                add “readonly” attribute to the textarea,

                update the new value to localStorage,

                if
                user clicks on a task’s checkbox :
                >>>>>>>
                    if
                    check
                    >>>>>>>>
                    update the check status,

                    add css style line through to the task next to it,

                    update the checked state to localStorage,

                    if
                    uncheck
                    >>>>>>>>
                    update the checked status,

                    remove css style line through to the task next to it,

                    update the checked state to localStorage,

                if
                user clicks on the priority radio button :
                >>>>>>>
                options are “none”, “low”, “medium” and “high”

                if
                user clicks on the description textarea :
                >>>>>>>
                remove “readonly” attribute on that description textarea to enable user edit the description,

                listen to user’s new value,

                update that description textarea with the new value,

                add “readonly” attribute to the description textarea,

                update the new value to localStorage,

                if
                user clicks on due date:
                >>>>>>>
                let user modify due date

                if
                user clicks on an empty space inside the task section :
                >>>>>>>
                    if
                    task section does not contains empty textarea :
                    >>>>>>>>
                    generate a new textarea for new task

                    else if
                    task section contains empty textarea :
                    >>>>>>>>
                    Do nothing 

    else
    >>
    do nothing


### add eventListener to project input button :
>
    if
    user press the type=“submit” button without entering a value in the input box
    >>
    return

    else
    project name equals to entered value 
    >>
    create a new project id for this new project name using new Date().valueOf()
    >>
    set isComplete Boolean value to “false”

