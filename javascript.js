document.addEventListener("DOMContentLoaded", loadTasks);

        document.getElementById("addTaskButton").addEventListener("click", addTask);
        document.getElementById("taskInput").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                addTask();
            }
        });

        function loadTasks() {
            const activeTasks = JSON.parse(localStorage.getItem("activeTasks")) || [];
            const archivedTasks = JSON.parse(localStorage.getItem("archivedTasks")) || [];

            activeTasks.forEach(task => {
                renderTask(task, false);
            });

            archivedTasks.forEach(task => {
                renderTask(task, true);
            });
        }

        function saveTasks() {
            const activeTasks = Array.from(document.querySelectorAll("#taskList li")).map(task => task.textContent.replace(" Complete Delete", ""));
            const archivedTasks = Array.from(document.querySelectorAll("#archiveTaskList li")).map(task => task.textContent);

            localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
            localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
        }

        function addTask() {
            const taskInput = document.getElementById("taskInput");
            const taskValue = taskInput.value.trim();

            if (taskValue === "") {
                alert("Please enter a task.");
                return;
            }
            renderTask(taskValue, false);
            saveTasks();
            taskInput.value = "";
        }

        function renderTask(taskValue, isArchived) {
            const li = document.createElement("li");
            li.textContent = taskValue;

            if (!isArchived) {
                const completeButton = document.createElement("span");
                completeButton.textContent = " Complete";
                completeButton.classList.add("completedBtn");
                completeButton.addEventListener("click", function() {
                    completeTask(li, taskValue);
                });
                li.appendChild(completeButton);

                const deleteButton = document.createElement("span");
                deleteButton.textContent = " Delete";
                deleteButton.classList.add("deleteBtn");
                deleteButton.addEventListener("click", function() {
                    li.remove();
                    saveTasks();
                });
                li.appendChild(deleteButton);

                document.getElementById("taskList").appendChild(li);
            } else {
                li.classList.add("completed");
                document.getElementById("archiveTaskList").appendChild(li);
            }
        }

        function completeTask(taskElement, taskDescription) {
            taskElement.remove();
            renderTask(taskDescription, true);
            saveTasks();
        }