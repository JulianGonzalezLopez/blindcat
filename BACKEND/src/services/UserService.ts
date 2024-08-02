import UserRepository from "../repositories/UserRepository";

export default class UserService{
    #userRepository: UserRepository;


    constructor(userRepository: UserRepository){
        this.#userRepository = userRepository;
    }


    async getUsers(){
            return await this.#userRepository.getUsers();
    }

    async getUser(username: string){
            const user = await this.#userRepository.getUser(username);
            if(Array.isArray(user) && user.length !== 0){
                return user;
            }
            throw {statusCode: 404, errorMessage:"No existe tal usuario"};
    }

    async getUserById(id:string){
            const user = await this.#userRepository.getUserById(id);
            return user;
    }

    async getUserDataById(id:string){ //HAY QUE BORRAR ESTE METODO
            const user = await this.#userRepository.getUserDataById(id);
            return user;
    }

    async getUsernamesById(users_ids: Array<string>){
            const users = await this.#userRepository.getUsernamesById(users_ids);
            console.log("pasó");
            return users;
    }

    async matchData(user: User){
            const result = await this.#userRepository.matchData(user);
            return result
    }

    async getUserPosts(user_id: string){
        return await this.#userRepository.getUserPosts(user_id);
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