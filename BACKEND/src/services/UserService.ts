import UserRepository from "../repositories/UserRepository";

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
                return user;
            }
            throw {statusCode: 404, errorMessage:"No existe tal usuario"};
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

    async createNewUser(user: User) {
        try {
            await this.getUser(user.username);
            throw {statusCode: 400, errorMessage: "El usuario ya existe"}
        } catch (e) {

            try {
                if(typeof e == "object" && e != null && "errorMessage" in e){
                    if (e.errorMessage === "No existe tal usuario") {
                        // Tratar el caso en que el usuario no se encuentra
                        // En este ejemplo, se crea un nuevo usuario

                        await this.#userRepository.createNewUser(user);
                        return {statusCode:201, message:"El usuario fue creado correctamente"};
                    } else if(e.errorMessage === "El usuario ya existe") {
                        throw e;
                    }
                    else{
                        throw {statusCode:500, errorMessage:"Nisiquiera yo se que pasó"};
                    }
                }
            } catch (innerError) {
                throw innerError;
            }
        }
    }

}