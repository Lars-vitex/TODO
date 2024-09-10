document.addEventListener('DOMContentLoaded', function() {
    const todoText = document.querySelector('.todo-text');
    const tasks = document.getElementById('tasks');

    // Add new task
    todoText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action of Enter key
            const taskText = event.target.value.trim();
            if (taskText !== '') {
                const task = document.createElement('li');
                task.style.position = 'relative'; // Ensure the parent element is relatively positioned

                // Create the input checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.style.position = 'absolute';
                checkbox.style.left = '10px';
                checkbox.style.top = '50%';
                checkbox.style.transform = 'translateY(-50%)';
                checkbox.addEventListener('click', function() {
                    if (checkbox.checked) {
                        checkbox.parentElement.classList.add('completed');
                    } else {
                        checkbox.parentElement.classList.remove('completed');
                    }
                    updateTaskCount();
                });

                // Create the input field for the task text
                const taskTextNode = document.createElement('span');
                taskTextNode.textContent = taskText;
                taskTextNode.style.marginLeft = '30px'; // Leave space for the checkbox

                // Create the delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = '';
                deleteBtn.style.position = 'absolute';
                deleteBtn.style.right = '10px';
                deleteBtn.style.top = '50%';
                deleteBtn.style.transform = 'translateY(-50%)';
                deleteBtn.addEventListener('click', function() {
                    task.parentNode.removeChild(task);
                    updateTaskCount();
                });

                // Append elements to the list item
                task.appendChild(checkbox);
                task.appendChild(taskTextNode);
                task.appendChild(deleteBtn);

                // Add the list item to the tasks list
                tasks.appendChild(task);
                event.target.value = ''; // Clear the textarea

                // Add the list item to the tasks list
                tasks.appendChild(task);
                event.target.value = ''; // Clear the textarea

                updateTaskCount(); // Update task count when a new task is added
            }
        }
    });

    // Edit task on double-click
    tasks.addEventListener('dblclick', function(event) {
        if (event.target.tagName === 'LI') {
            const li = event.target;
            const checkbox = li.querySelector('input[type="checkbox"]');
            const taskTextNode = li.querySelector('span');
            
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskTextNode.textContent;
            input.style.width = 'calc(100% - 80px)'; // Adjust width to fit within li

            // Remove existing text and replace it with input
            li.textContent = '';
            li.appendChild(input);
            
            // Re-add checkbox and delete button
            li.appendChild(checkbox);
            li.appendChild(deleteBtn);

            input.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    finalizeEdit();
                }
            });

            input.addEventListener('blur', finalizeEdit);

            function finalizeEdit() {
                if (input.value.trim() === '') {
                    // Do not finalize if input is empty
                    return;
                }
                // Clear the current content of li
                li.textContent = '';

                // Append the checkbox, text node, and delete button again
                li.appendChild(checkbox);
                li.appendChild(document.createTextNode(input.value));
                li.appendChild(deleteBtn);
            }

            input.focus();
        }
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const checkAllButton = document.getElementById('checkAllButton');
    const taskCountElement = document.getElementById('taskCount');
    const taskList = document.getElementById('tasks');

    if (!checkAllButton) {
        console.error('Button with ID "checkAllButton" not found.');
        return;
    }

    if (!taskCountElement) {
        console.error('Element with ID "taskCount" not found.');
        return;
    }

    if (!taskList) {
        console.error('Element with ID "tasks" not found.');
        return;
    }

    checkAllButton.addEventListener('click', () => {
        const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
        
        if (checkboxes.length === 0) {
            console.error('No checkboxes found.');
            return;
        }

        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked;
            if (checkbox.checked) {
                checkbox.parentElement.classList.add('completed');
            } else {
                checkbox.parentElement.classList.remove('completed');
            }
        });

        console.log(allChecked ? 'All items have been unmarked as completed.' : 'All items have been marked as completed.');

        // Update the task count after checking/unchecking all checkboxes
        updateTaskCount();
    });

    // Initial task count update
    updateTaskCount();
});

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the necessary elements
    const clearCompletedButton = document.getElementById('clearCompleted');
    const taskList = document.getElementById('tasks');
    const taskCountElement = document.getElementById('taskCount');

    // Function to clear completed tasks
    function clearCompletedTasks() {
        // Get all the tasks (li elements)
        const tasks = taskList.getElementsByTagName('li');

        // Loop through the tasks in reverse order
        // (we loop in reverse so that removing items doesn't affect the loop index)
        for (let i = tasks.length - 1; i >= 0; i--) {
            const task = tasks[i];
            // Check if the task's checkbox is checked
            const checkbox = task.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                // Remove the task from the DOM
                taskList.removeChild(task);
            }
        }

        // Update task count
        updateTaskCount();
    }
    
    // Add click event listener to the clear completed button
    clearCompletedButton.addEventListener('click', clearCompletedTasks);
});

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the necessary elements
    const activeItemsButton = document.getElementById('activeItemsButton');
    const completedItemsButton = document.getElementById('completedItemsButton');
    const allItemsButton = document.getElementById('allItemsButton');
    const taskList = document.getElementById('tasks');

    // Function to show all tasks
    function showAllTasks() {
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            task.style.display = ''; // Show all tasks
        });
    }

    // Function to show only active tasks (unchecked checkboxes)
    function showActiveTasks() {
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            const checkbox = task.querySelector('input[type="checkbox"]');
            if (checkbox && !checkbox.checked) {
                task.style.display = ''; // Show active tasks
            } else {
                task.style.display = 'none'; // Hide completed tasks
            }
        });
    }

    // Function to show only completed tasks (checked checkboxes)
    function showCompletedTasks() {
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            const checkbox = task.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                task.style.display = ''; // Show completed tasks
            } else {
                task.style.display = 'none'; // Hide active tasks
            }
        });
    }

    // Add event listeners to the buttons
    activeItemsButton.addEventListener('click', showActiveTasks);
    completedItemsButton.addEventListener('click', showCompletedTasks);
    allItemsButton.addEventListener('click', showAllTasks);
});

// Function to update the task count
function updateTaskCount() {
    const taskCountElement = document.getElementById('taskCount');
    const tasks = document.querySelectorAll('#tasks li');
    const activeTasks = Array.from(tasks).filter(task => !task.classList.contains('completed')).length;
    taskCountElement.textContent = `${activeTasks} items left!`;
}




