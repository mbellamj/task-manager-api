# test-technique

Just like Wunderlist or Google Tasks, task lists are a part of the daily routine for professionals across all sectors.

The application to develop consists of two main sections:

- Authentication page
- Main page

## Authentication page

This is the page where a user who is not logged into the application lands by default.

They have the option to:

- Either log in using a username/password,
- Or create an account by filling out a form with basic information such as name, surname, email address (and its verification field), password (and its verification field), etc.

## Main page

This page contains 3 subcategories:

- Left sidebar
- Main content
- Right sidebar

#### Left sidebar

As in many applications, this part of the page is a vertical, retractable banner that allows the user to perform various actions and find important information.

In this case, the user should be able to:

- Create a new task list (by giving it a name that does not already exist),
- Find all the task lists they have created,
- Select a task list,
- Delete a task list.

If the user deletes a task list, a modal will appear informing them that all associated tasks will also be deleted and will ask them to confirm or cancel the action.

#### Main content

This is the main section of the application. It is located at the center of the page and displays all the tasks of a selected list from the left sidebar.

The user can create a task from this screen by filling out several fields for that task:

- Short description (required)
- Long description (optional)
- Due date (required)

On the main display, each task must be able to be marked as completed. It will then appear in a "Completed tasks" section, which is hidden by default. 
The "Completed tasks" section should be able to be opened and list all completed tasks. 
A completed task should be able to return to the "To do" section if the user made a mistake.

#### Right sidebar

This section only appears when the user clicks on a task. It is the detailed view of the task and includes all the information filled out during its creation, along with:

- The task creation date
- A button to delete the task

If the user deletes a task, a modal will ask them to confirm this action. The task will then disappear from the task list.

## Points of attention

- The user must remain logged in throughout their session,
- The left sidebar and right sidebar must be retractable/openable,
- The left sidebar should display buttons/icons that allow the creation of a new task list and show a minimal version of the task lists (icons, etc.),
- If no task list is selected, the main content region should notify the user that nothing is displayable until a list is selected,
- The right sidebar should retract automatically if the user clicks anywhere other than on a task in the current list,
- The front-end and back-end architecture should be designed to scale and be future-proof.

## Technologies to use and guidelines

The list below mentions the technologies to use.
The use of additional libraries and/or technologies is welcome.

#### Front-end

- Angular/React
- Possible use of a framework/library such as Material, Ant, Tailwind, or others

#### Back-end

- Choice between Node.js, FastAPI, Rocket, or another framework of your choice,
- Authentication/authorization via JWT
- Relational database (Postgresql, etc.), NoSQL database (MongoDB, etc.), or Graph database (DGraph, etc.)

#### Hosting the project

- Use of a Github repository
- Use of regular commits on specific branches
- The version analyzed will be the latest available commit.
