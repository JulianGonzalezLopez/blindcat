import UserRepository from "../repositories/UserRepository.js";

export default class UserService{
    #userRepository: UserRepository;


    constructor(userRepository: UserRepository){
        this.#userRepository = userRepository;
    }


    getUsers(){
        try{
            let users = this.#userRepository.getUsers();
            return users;
        }
        catch(e){
            throw e;
        }
    }

    getUser(username: string){
        try{

            let user = this.#userRepository.getUser(username);
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