import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {Todos} from '../resources/data/todolist';
import {Users} from '../resources/data/users';

import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from '../resources/utils/bootstrap-form-renderer';

@inject(Router,AuthService,Todos,Users,ValidationControllerFactory)
export class Wall 
{
  DATE_FORMAT_TABLE = "MM/DD/YYYY";
  DATE_FORMAT_CONTROL = "YYYY-MM-DD";

 constructor(router,auth,todos,users,controllerFactory)
 {
     this.router = router;
     this.message = 'To Do List';
     this.todos = todos;
     this.users = users;
     this.auth = auth;
     this.newTodoTask;this.newTodoDueDate;this.newTodoPriority;
     this.wallMessage="";
     this.saveStatus="";
     this.createNewTodo = false;
     this.priorities =['High','Medium','Low'];
     this.hidecomplete=false;
     this.controller = controllerFactory.createForCurrentScope();
     this.controller.addRenderer(new BootstrapFormRenderer());  

 }

async activate() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.users.setUser(this.user);
    let serverResponse = await this.todos.getUserstodos(this.user._id);
    if (serverResponse.error) {
      this.wallMessage = "Error retrieving tasks";
    }
  }

 async refresh(){
    await this.todos.getUserstodos(this.user._id);
  } 

createTodoClick()
{
  this.newTodoDueDate = new Date(new Date().toDateString());
  this.createNewTodo = true;
}
cancelCreateTodo()
{
  this.createNewTodo = false;
}

async createTodo(){
let result = await this.controller.validate();
if (this.newTodoTask) {
      var todo = {
        task: this.newTodoTask,
        user: this.user._id,
        taskAuthor: this.user._id,
        duedate: this.newTodoDueDate,
        priority: this.newTodoPriority
      }
      let serverResponse = await this.todos.saveTodo(todo);
      if (serverResponse && !serverResponse.error) {
        this.newTodoTask = "";this.newTodoDueDate = "";this.newTodoPriority = "";
        this.saveStatus = "";
        this.createNewTodo = false;
         this.todos.todoArray[0].todoAuthor = new Object();
         this.todos.todoArray[0].todoAuthor = {email : this.user.email,firstName: this.user.firstName,lastName: this.user.lastName, screenName: this.user.screenName};
      } else {
        this.saveStatus = "Error saving todo";
      }
    }
  }
  
async completeTodo(todo){
  todo.complete=true;
  let serverResponse = await this.todos.updateTodo(todo);
  if (serverResponse && !serverResponse.error) {
    this.saveStatus = "";
  }
  else {
        this.saveStatus = "Error saving complete";
      }
}

async deleteTask(todo,index){
  let serverResponse = await this.todos.deleteTodo(index,todo._id);
  if (serverResponse && !serverResponse.error) {
    this.saveStatus = "";
  }
  else {
        this.saveStatus = "Error deleting task "+todo._id;
      }
}

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
}

home(){
    this.router.navigate('home');
}
}
ValidationRules  
	.ensure(a => a.newTodoTask).required()
	.ensure(a => a.newTodoDueDate).required() 
  .ensure(a => a.newTodoPriority).required()   
	.on(Wall);
