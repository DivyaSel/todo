import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Todos { 

	constructor(data) {
        		this.data = data;
		this.todosArray = undefined;
    	}

 async saveTodo(todo){ 
       try {
            let serverResponse = await this.data.post(todo, this.data.TODO_SERVICE);
	        if(!serverResponse.error) {
                    this.todoArray.unshift(serverResponse);
                }
                return serverResponse;
                    } catch (error) {
                            console.log(error);
                            return undefined;
                    }
 }

 async updateTodo(todo){ 
       try {
            let serverResponse = await this.data.put(todo, this.data.TODO_SERVICE);
	        if(serverResponse.error) {
                    console.log(serverResponse.error);
                    return undefined;
                }
                else {return serverResponse;}
                    } catch (error) {
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
}
