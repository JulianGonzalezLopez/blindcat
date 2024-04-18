import UserRepository from "../repositories/UserRepository.js";

export default class UserService{
    #userRepository: UserRepository;


    constructor(userRepository: UserRepository){
        this.#userRepository = userRepository;
    }


    async getUsers(){
        try{
            let users = await this.#userRepository.getUsers();
            return users;
        }
        catch(e){
            throw e;
        }
    }

    async getUser(username: string){
        try{
            let user = await this.#userRepository.getUser(username);
            if(Array.isArray(user) && user.length !== 0){
                console.log("SERVICE USER");
                console.log(user);
                return user;
            }
            throw {"en":"There is not such an user"};
        }
        catch(e){
            throw e;
        }
    }

    async getUserById(id:number){
        try{
            let user = await this.#userRepository.getUserById(id);
            return user;
        }
        catch(e){
            throw e;
        }
    }

    async getUserDataById(id:number){ //HAY QUE BORRAR ESTE METODO
        try{
            let user = await this.#userRepository.getUserDataById(id);
            return user;
        }
        catch(e){
            throw e;
        }
    }

    async getUsernamesById(users_ids: Array<number>){
        try{
            let users = await this.#userRepository.getUsernamesById(users_ids);
            return users;
        }
        catch(e){

        }
    }

    async matchData(user: User){
        try{
            let result = await this.#userRepository.matchData(user);
            return result
        }
        catch(e){
            throw e;
        }
    }

    async createNewUser(user: User){
        try{
            let results = await this.getUser(user.username);
            if(Array.isArray(results) && results.length !== 0){
                throw "El usuario ya existe";
            }
            else{
                await this.#userRepository.createNewUser(user);
                return {"en":"The user has been created successfully"}
            }
        }
        catch(e){
            throw e;
        }
    }

}