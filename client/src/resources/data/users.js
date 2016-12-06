import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)

export class Users { 
    constructor(data){
        this.data = data;
    }

setUser(user) {
        this.selectedUser = user;
    }
    
     async save(user){
        if(user){
            try{
                let serverResponse = await this.data.post(user, this.data.USER_SERVICE);
                return serverResponse;
             } catch (error) {
                console.log(error);
                return undefined;
            }
        }
    }
}