import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
import moment from 'moment';

@inject(DataServices)
export class Todos { 

	constructor(data) {
        		this.data = data;
		this.todosArray = undefined;
    	}

 async saveTodo(){
       try {
            let serverResponse = await this.data.post(this.selectedTodo, this.data.TODO_SERVICE);
	        if(!serverResponse.error) {
                    this.todoArray.unshift(serverResponse);
                }
                return serverResponse;
                    } catch (error) {
                            console.log(error);
                            return undefined;
                    }
 }

 async updateTodo(){ 
       try {
            let serverResponse = await this.data.put(this.selectedTodo, this.data.TODO_SERVICE);
	        if(serverResponse.error) {
                    console.log(serverResponse.error);
                    return undefined;
                }
                else {
                    this.todoArray[this.selectedIndex].task = serverResponse.task;
                    this.todoArray[this.selectedIndex].duedate = serverResponse.duedate;
                    this.todoArray[this.selectedIndex].dateCreated = serverResponse.dateCreated;
                    this.todoArray[this.selectedIndex].priority = serverResponse.priority;
                    this.todoArray[this.selectedIndex].complete = serverResponse.complete;
                    return serverResponse;
                }
            } 
            catch (error) {
                            console.log(error);
                            return undefined;
        }
 }

 async completeUpdate(todo){
    try {
            let serverResponse = await this.data.put(todo, this.data.TODO_SERVICE);
	        if(serverResponse.error) {
                    console.log(serverResponse.error);
                    return undefined;
                }
                else {
                    return serverResponse;
                }
            } 
            catch (error) {
                            console.log(error);
                            return undefined;
        }
 }

 async deleteTodo(index,id){ 
       var url = this.data.TODO_SERVICE + '/' + id;
        try {
            let serverResponse = await this.data.delete(url);
            if (!serverResponse.error) {
               this.todoArray.splice(index,1);
            }
            return serverResponse;
        } catch (error) {
            console.log(error);
            return undefined;
        }
 }

async getUserstodos(id) {
        var url = this.data.TODO_SERVICE + '/usertask/' + id;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.todoArray = serverResponse;
            }
            return serverResponse;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    selectTodo(index){
      if(!index && index!=0){
        this.selectedTodo={
          task: "",
          priority: "",
          duedate: moment(new Date()).format("YYYY-MM-DD"),
          //dateCreated: moment(new Date()).format("YYYY-MM-DD")
          dataCreated: new Date()
        }
      }
      else{
        this.selectedIndex = index;
        this.selectedTodo={
          _id: this.todoArray[index]._id,
          task: this.todoArray[index].task,
          //duedate: moment(this.todoArray[index].duedate).format("YYYY-MM-DD"),
          duedate: this.todoArray[index].duedate,
          dateCreated: this.todoArray[index].dateCreated,
          priority: this.todoArray[index].priority,
          complete: this.todoArray[index].complete
        }
      }
    }

}
