const inputTask = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const dueDate = document.getElementById("dueDate");
const priorityText = document.getElementById("priorityText");

let editTask = null;

const addTask = () => {
  const text = inputTask.value.trim();
  let date = dueDate.value;
//   let priority = priorityText.value;
  if (!text) {
    alert("Please enter a task");
    return false;
  }

  if (addBtn.value === "Edit") {
    // const li = editTask.target.parentElement;
    const li = editTask;

    const oldText = li.children[1].innerText;
    // console.log(oldText);
    const oldDate = li.children[2].innerText.replace("Due:", "").trim();
    // console.log(oldDate);
    const oldPriority = li.children[3].innerText
      .replace("Priority:", "")
      .trim();
    //   console.log(oldPriority);
    const newText = inputTask.value.trim();
    // console.log(newText);
    const newDate = dueDate.value;
    // console.log(newDate);
    const newPriority = priorityText.value;
    // console.log(newPriority);

    li.children[1].innerHTML = newText;
    li.children[2].innerHTML = "Due:" + newDate;
    li.children[3].innerHTML = "Priority:" + newPriority;

    editLocalTasks(
      oldText,
      oldDate,
      oldPriority,
      newText,
      newDate,
      newPriority
    );
    // console.log(text);
    addBtn.value = "Add";
    addBtn.innerText = "Add";
    inputTask.value = "";
    return;
  }

  if (!date) {
    alert("Please select date");
    return false;
  }

  //   const priority = priorityText.option;
  //   if(priority === ""){
  //     alert("Please select priority")
  //     return false
  //   }
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-check");
  li.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      p.style.textDecoration = "line-through";
    } else {
      p.style.textDecoration = "none";
    }
    taskComplete(text, date, priorityText.value, checkbox.checked);
  });
  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  let dateP = document.createElement("p");
  dateP.innerText = "Due:" + date;
  //   console.log(date);
  //   console.log(dateP.innerText);
  dateP.classList.add("date-task");
  li.appendChild(dateP);
  //   console.log(li);

  let priorityP = document.createElement("p");
  priorityP.innerText = "Priority:" + priorityText.value;
  li.appendChild(priorityP);

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "editBtn");
  li.appendChild(editBtn);

  editBtn.addEventListener("click", updateTask);

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("btn", "deleteBtn");
  li.appendChild(delBtn);

  delBtn.addEventListener("click", updateTask);

  taskList.appendChild(li);

  saveTasks({
    text: inputTask.value,
    date: dueDate.value,
    priorityText: priorityText.value,
    completed: false,
  });

  inputTask.value = "";
  dueDate.value = "";
  priorityText.value = "Low";
};

const updateTask = (e) => {
  //   console.log(e);
  //   console.log(e.target.parentElement);
  //   console.log(e.target.innerText);
  let li = e.target.parentElement;
  if (e.target.innerHTML === "Delete") {
    taskList.removeChild(li);
    delLocalTasks(li);
    renderTasks();
  }

  //   let p = ;
  //   console.log(e.target.previousElementSibling.innerHTML);
  if (e.target.innerHTML === "Edit") {
    inputTask.value = li.children[1].innerText; 
    dueDate.value = li.children[2].innerText.replace("Due:", "").trim(); 
    priorityText.value = li.children[3].innerText
      .replace("Priority:", "")
      .trim();
    inputTask.focus();
    // dueDate.focus();
    // priorityText.focus();
    addBtn.value = "Edit";
    addBtn.innerText = "Edit";
    // console.log(addBtn.value);
    // console.log(addBtn)
    editTask = li;
    return;
  }

  //   if(e.target.innerText === "Edit"){
  //     taskList.p = inputTask;
  //   }
};

const saveTasks = (task) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // console.log(localStorage.getItem("tasks"));
  // console.log(JSON.parse(localStorage.getItem("tasks")));
  // task.complete = false;
  tasks.push(task);
  // console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocalTasks = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-check");
    checkbox.checked = task.completed;

    const p = document.createElement("p");

    p.innerText = task.text;
    if (task.completed) {
      p.style.textDecoration = "line-through";
    }
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      taskComplete(task.text, task.date, task.priorityText, task.completed);
      if (checkbox.checked) {
        p.style.textDecoration = "line-through";
      } else {
        p.style.textDecoration = "none";
      }
    });
    li.appendChild(checkbox);
    li.appendChild(p);
    let date = dueDate.value;
    let dateP = document.createElement("p");
    dateP.innerText = "Due:" + task.date;
    //   console.log(date);
    //   console.log(dateP.innerText);
    dateP.classList.add("date-task");
    li.appendChild(dateP);
    //   console.log(li);

    let priorityP = document.createElement("p");
    priorityP.innerText = "Priority:" + task.priorityText;
    li.appendChild(priorityP);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.classList.add("btn", "deleteBtn");
    li.appendChild(delBtn);

    taskList.appendChild(li);
    editBtn.addEventListener("click", updateTask);
    delBtn.addEventListener("click", updateTask);
  });
};

const delLocalTasks = (task) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // console.log(tasks)
  // let taskText = task.children[0].innerHTML;
  // console.log(taskText);
  // let taskIndex = tasks.indexOf(taskText);
  // tasks.splice(taskIndex, 1);
  // localStorage.setItem("tasks",JSON.stringify(tasks))

  let text = task.children[1].innerText;
  let date = task.children[2].innerText.replace("Due:", "").trim();
  let priority = task.children[3].innerText.replace("Priority:", "").trim();

  tasks = tasks.filter((t) => {
    return t.text !== text || t.date !== date || t.priorityText !== priority;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const editLocalTasks = (
  oldText,
  oldDate,
  oldPriority,
  newText,
  newDate,
  newPriority
) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.map((t) => {
    if (
      t.text === oldText &&
      t.date === oldDate &&
      t.priorityText === oldPriority
    ) {
      return {
        text: newText,
        date: newDate,
        priorityText: newPriority,
        completed: t.completed,
      };
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskComplete = (text, date, priorityText, completed) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) => {
    if (t.text === text && t.date === date && t.priorityText === priorityText) {
      t.completed = completed;
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = (filter) => {
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (filter === "completed") {
    tasks = tasks.filter((t) => t.completed);
  } else if (filter === "pending") {
    tasks = tasks.filter((t) => !t.completed);
  }
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-check");
    checkbox.checked = task.completed;

    const p = document.createElement("p");

    p.innerText = task.text;
    if (task.completed) {
      p.style.textDecoration = "line-through";
    }
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      taskComplete(task.text, task.date, task.priorityText, task.completed);
      renderTasks(filter);

      if (checkbox.checked) {
        p.style.textDecoration = "line-through";
      } else {
        p.style.textDecoration = "none";
      }
    });
    li.appendChild(checkbox);
    li.appendChild(p);
    let date = dueDate.value;
    let dateP = document.createElement("p");
    dateP.innerText = "Due:" + task.date;
    //   console.log(date);
    //   console.log(dateP.innerText);
    dateP.classList.add("date-task");
    li.appendChild(dateP);
    //   console.log(li);

    let priorityP = document.createElement("p");
    priorityP.innerText = "Priority:" + task.priorityText;
    li.appendChild(priorityP);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    editBtn.addEventListener("click", updateTask);
    li.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.classList.add("btn", "deleteBtn");
    delBtn.addEventListener("click", updateTask);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
};

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    renderTasks(filter);
  });
});
document.addEventListener("DOMContentLoaded", getLocalTasks);
addBtn.addEventListener("click", addTask);
// taskList.addEventListener("click", updateTask);
