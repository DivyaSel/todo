import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {Todos} from '../resources/data/todolist';
import {Users} from '../resources/data/users';  

@inject(Router,AuthService,Todos,Users)
export class List 
{
  DATE_FORMAT_TABLE = "MM/DD/YYYY";
  DATE_FORMAT_CONTROL = "YYYY-MM-DD";

 constructor(router,auth,todos,users)
 {
     this.router = router;
     this.message = 'To Do List';
     this.todos = todos;
     this.users = users;
     this.auth = auth;
     this.listMessage="";
     this.saveStatus="";
     this.priorities =['High','Medium','Low'];
     this.hidecomplete=false;
     this.todoSelected=false;
     this.saveError="";
 }

async activate() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.users.setUser(this.user);
    let serverResponse = await this.todos.getUserstodos(this.user._id);
    if (serverResponse.error) {
      this.listMessage = "Error retrieving tasks";
    }
  }

 async refresh(){
    await this.todos.getUserstodos(this.user._id);
  } 

cancelTodoSelection()
{
  this.todoSelected = false;
  this.saveError = "";
}

createTodoClick()
{
  //this.newTodoDueDate = new Date(new Date().toDateString());
  this.todos.selectTodo();
  this.todoSelected = true;
}

async save()
{
if (this.todos.selectedTodo.task.length>0) {
 if(this.todos.selectedTodo._id)
 {
   await this.todos.updateTodo();
 }
 else{
   this.todos.selectedTodo.taskAuthor = this.user._id;
   if(this.todos.selectedTodo.priority==""){
     this.todos.selectedTodo.priority="Medium";
   }
   await this.todos.saveTodo();
 }
 this.todoSelected = false;
 this.saveError = "";
  }
  else{
    this.saveError="Task should not be empty";
  }
}

edit(index){
    this.todos.selectTodo(index);
    this.todoSelected = true;
}

async completeTodo(todo){
  let serverResponse = await this.todos.completeUpdate(todo);
  if (serverResponse && !serverResponse.error) {
    this.saveStatus = "";
    todo=serverResponse;
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




