const newTask = document.querySelector('#newTask');
const addTaskBtn = document.getElementById('addBtn')
const taskListCard = document.getElementById('taskList');
const list = document.querySelector('.collection');
const filterForm = document.getElementById('filter');
const clearBtn = document.getElementById('clearBtn');

const testBtn = document.getElementById('tests');

if(localStorage.getItem('tasks') === null) //tasks in LS is empty?
  taskListCard.style.display = 'none';
// else 
//   taskListCard.style.display = 'block';


//ACTIONS
addTaskBtn.addEventListener('click',addTask);
list.addEventListener('click',removeTask);
filterForm.addEventListener('keyup',filterTasks);
clearBtn.addEventListener('click',clearTasks);

testBtn.addEventListener('click',test);

//FUNCTIONS
function addTask(e){
  let tasks;
  let isAdded = true;

  if(newTask.value == ''){ //text field is empty?
    alert('write a task');
  } else {
    if(localStorage.getItem('tasks') === null){ //tasks in LS is empty?
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(element => { //is task already added?
    if(element.toLowerCase() == newTask.value.toLowerCase()){
      alert('already added');
      isAdded = false;
    }
    });
  }
  if(isAdded){
    tasks.push(newTask.value);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    console.log(`task '${newTask.value}' saved`);
    isAdded = false;
    taskListCard.style.display = 'block';
    createHtmlElement();
    newTask.value = '';
  }
  e.preventDefault();
}

function createHtmlElement(){
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(newTask.value));
  const removeBtn = document.createElement('a');
  removeBtn.className = 'delete-item secondary-content';
  removeBtn.setAttribute('href','#');
  removeBtn.innerHTML ='<i class="material-icons">clear</i>';
  li.appendChild(removeBtn);
  list.appendChild(li);
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    const dialog = confirm('Are you sure?');
    if(dialog){
    e.target.parentElement.parentElement.remove();}
    else {
      console.log(e.target.parentElement.parentElement.textContent.slice(0,-5));
    }
  }

  //remove from Local Storage
  // localStorage.getItem
}

function filterTasks(e){
  const input = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(item => {
    if(item.firstChild.textContent.toLowerCase().indexOf(input) != -1){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function clearTasks(){
  list.innerHTML = '';
}

function test(e){
  const tasksFromLS = JSON.parse(localStorage.getItem('tasks'));
  console.log(tasksFromLS);
  const collectionItems = document.querySelectorAll('.collection-item');
  collectionItems.forEach(e => {
    console.log(e.firstChild.textContent.toLocaleLowerCase());
  });
  console.log(`A BORRAR: ${e.target.parentElement.textContent}`);
}