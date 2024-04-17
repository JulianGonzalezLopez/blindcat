import UserRepository from "../repositories/UserRepository.js";

export default class UserService{

    getUsers(){
        try{
            let repository = new UserRepository();
            let users = repository.getUsers();
            return users;
        }
        catch(e){
            throw e;
        }
    }

    getUser(username: string){
        try{
            let repository = new UserRepository();
            let user = repository.getUser(username);
            if(Array.isArray(user) && user.length !== 0){
                console.log("SERVICE USER");
                console.log(user);
                return user;
            }
            else{
                
            }
        }
        catch(e){
            throw e;
        }
    }

}