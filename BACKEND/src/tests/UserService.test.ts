// UserService.test.ts
import UserService from '../services/UserService';
import UserRepository from '../repositories/UserRepository';

// Creamos un mock para UserRepository
jest.mock('../repositories/UserRepository');

describe('UserService - getUser', ()=>{
    beforeEach(() => {
        // Limpiar cualquier mock antes de cada prueba
        jest.clearAllMocks();
    });

    it('Debe fallar en retornar el usuario (no existe tal usuario)', async () => {
        expect.assertions(1);
        const mockValue = [{ username: 'user1', cantidad_posts: 10, karma: 20 }];
        const mockGetUser = jest.fn().mockImplementation((username)=>{
            for(const user of mockValue){
                //@ts-ignore
                if(user.username === username){
                    return [user]
                }
            }
        });
        UserRepository.prototype.getUser = mockGetUser;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());
        console.log("!!!!?");
        // Llamamos al método getUsers de UserService
        try{
            let res = await userService.getUser("user01");
        }
        catch{
            expect(mockGetUser).toHaveBeenCalled();
        }

    });

    it('Debe retornar el usuario user1', async () => {
        const mockValue = [{ username: 'user1', cantidad_posts: 10, karma: 20 }];
        const mockGetUser = jest.fn().mockImplementation((username)=>{
            for(const user of mockValue){
                //@ts-ignore
                if(user.username === username){
                    return [user]
                }
            }
        });
        UserRepository.prototype.getUser = mockGetUser;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());
        // Llamamos al método getUsers de UserService
        
        let res = await userService.getUser("user1");
        
        expect(res).toEqual([{ username: 'user1', cantidad_posts: 10, karma: 20 }]);
        expect(mockGetUser).toHaveBeenCalled();
    });

    it('Debe retornar el usuario user1', async () => {
        const mockValue = [{ username: 'user1', cantidad_posts: 10, karma: 20 }];
        const mockGetUser = jest.fn().mockImplementation((username)=>{
            for(const user of mockValue){
                //@ts-ignore
                if(user.username === username){
                    return [user]
                }
            }
        });
        UserRepository.prototype.getUser = mockGetUser;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());
        console.log("!!!!?");
        // Llamamos al método getUsers de UserService
        let res = await userService.getUser("user1");
        expect(mockGetUser).toHaveBeenCalled();
        expect(res).toEqual(mockValue);
    });

})

describe('UserService - getUsers', () => {
    beforeEach(() => {
        // Limpiar cualquier mock antes de cada prueba
        jest.clearAllMocks();
    });

    it('Debe tirar un error', async () => {
        // Mockeamos el método getUsers de UserRepository
        const mockValue = new Error("ERROR GENERICO PARA TEST UNITARIO");
        const mockGetUsers = jest.fn().mockResolvedValue(mockValue);
        UserRepository.prototype.getUsers = mockGetUsers;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        let res = await userService.getUsers();

        expect(mockGetUsers).toHaveBeenCalled();
        expect(res).toEqual(mockValue);
    });

    it('Debe retornar un usuario valido', async () => {
        // Mockeamos el método getUsers de UserRepository
        const mockValue = [{ username: 'user1', cantidad_posts: 10, karma: 20 }];
        const mockGetUsers = jest.fn().mockResolvedValue(mockValue);
        UserRepository.prototype.getUsers = mockGetUsers;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        let res = await userService.getUsers();

        expect(mockGetUsers).toHaveBeenCalled();
        expect(res).toEqual(mockValue);
    });

    it('Debe retornar un tres usuarios validos', async () => {
        // Mockeamos el método getUsers de UserRepository
        const mockValue = [
            { username: 'user1', cantidad_posts: 10, karma: 20 },
            { username: 'user2', cantidad_posts: 10, karma: 20 },
            { username: 'user3', cantidad_posts: 10, karma: 20 }
        ];
        const mockGetUsers = jest.fn().mockResolvedValue(mockValue);
        UserRepository.prototype.getUsers = mockGetUsers;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        let res = await userService.getUsers();

        expect(mockGetUsers).toHaveBeenCalled();
        expect(res).toEqual(mockValue);
    });

    // Puedes agregar más pruebas para los otros métodos de UserService según sea necesario
});

describe('UserService - getUserById', ()=>{
    beforeEach(() => {
        // Limpiar cualquier mock antes de cada prueba
        jest.clearAllMocks();
    });
    

    it('Debe fallar en retornar el usuario por ID (no existe tal ID)', async () => {
        expect.assertions(1);
        const mockValue = [{ id:1, username: 'user1', cantidad_posts: 10, karma: 20 }];
        const mockGetUserById = jest.fn().mockImplementation((id)=>{
            for(const user of mockValue){
                //@ts-ignore
                if(user.id === id){
                    return [user]
                }
            }
            throw "No encontrado";
        });
        UserRepository.prototype.getUserById = mockGetUserById;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());
        console.log("!!!!?");
        // Llamamos al método getUsers de UserService
        try{
            let res = await userService.getUserById(999);
        }
        catch{
            expect(mockGetUserById).toHaveBeenCalled();
        }

    });

    it('Debe retornar el usuario user1 por id (1)', async () => {
        const mockValue = [{id: 1, username: 'user1', cantidad_posts: 10, karma: 20 }];
        const mockGetUserById = jest.fn().mockImplementation((id)=>{
            for(const user of mockValue){
                console.log("!!!!!!!!!!!!!!!!!");
                console.log(user);
                //@ts-ignore
                if(user.id === id){
                    return user
                }
            }
        });
        UserRepository.prototype.getUserById = mockGetUserById;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());
        // Llamamos al método getUsers de UserService
        
        let res = await userService.getUserById(1);
        
        expect(res).toEqual({ id: 1, username: 'user1', cantidad_posts: 10, karma: 20 });
        expect(mockGetUserById).toHaveBeenCalled();
    });
})

describe("UserService - createNewUser",()=>{
    beforeEach(() => {
        // Limpiar cualquier mock antes de cada prueba
        jest.clearAllMocks();
    });

    it('Debe fallar en crear un usuario (username duplicado)', async () => {
        expect.assertions(2);
        // Mockeamos el método getUsers de UserRepository
        const existingUsers = [{ username: 'user1', cantidad_posts: 10, karma: 20 }];
        const mockGetUser = jest.fn().mockImplementation((username)=>{
            for(const user of existingUsers){
                //@ts-ignore
                if(user.username === username){
                    throw {errorMessage: "El usuario ya existe", "statusCode": 400,};
                }

            }
        })
        UserRepository.prototype.getUser = mockGetUser;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        try{
            let res = await userService.createNewUser({username:"user1", password:"passwordUser1"});
            console.log("DIOSSSSSSSSSS");
            console.log(res);
        }
        catch(err){
            expect(mockGetUser).toHaveBeenCalled();
            expect(err).toEqual({statusCode: 400, errorMessage: "El usuario ya existe"});
        }
    });

    it('Debe crear un usuario', async () => {
        expect.assertions(2);
        // Mockeamos el método getUsers de UserRepository
        const existingUsers = [{ username: 'user1', cantidad_posts: 10, karma: 20 }];
        const mockGetUser = jest.fn().mockImplementation((username)=>{
            for(const user of existingUsers){
                //@ts-ignore
                if(user.username === username){
                    throw {errorMessage: "El usuario ya existe", "statusCode": 400,};
                }

            }
        })

        const mockCreateUser = jest.fn().mockResolvedValue({statusCode: 201, message: 'El usuario fue creado correctamente' });

        UserRepository.prototype.getUser = mockGetUser;
        UserRepository.prototype.createNewUser = mockCreateUser;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        try{
            let res = await userService.createNewUser({username:"user2", password:"passwordUser2"});
            expect(res).toEqual({statusCode: 201, message: 'El usuario fue creado correctamente' });
            expect(mockGetUser).toHaveBeenCalled();
        }
        catch(err){

        }
        
    });

});

describe('UserService - matchData', ()=>{
    beforeEach(() => {
        // Limpiar cualquier mock antes de cada prueba
        jest.clearAllMocks();
    });

    const mockData = { username: 'user1', password:"password1", cantidad_posts: 10, karma: 20 };
    const mockMatchData = jest.fn().mockImplementation((user)=>{
        
        console.log(user);
        console.log(mockData);
        //@ts-ignore
        if(user.password == mockData.password && user.username == mockData.username){
            return true;
        }
        else{
            return false;
        }
    })

    it('Fallar en matchear info (Contraseña erronea)', async () => {
        // Mockeamos el método getUsers de UserRepository

        UserRepository.prototype.matchData = mockMatchData;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        let res = await userService.matchData({username: "user1", password:"password2"});

        expect(res).toEqual(false);
        expect(mockMatchData).toHaveBeenCalled();
    });

    it('Fallar en matchear info (username erroneo)', async () => {
        // Mockeamos el método getUsers de UserRepository

        UserRepository.prototype.matchData = mockMatchData;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        let res = await userService.matchData({username: "user2", password:"password1"});

        expect(res).toEqual(false);
        expect(mockMatchData).toHaveBeenCalled();
    });

    it('Matchear info', async () => {
        // Mockeamos el método getUsers de UserRepository

        UserRepository.prototype.matchData = mockMatchData;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        let res = await userService.matchData({username: "user1", password:"password1"});

        expect(res).toEqual(true);
        expect(mockMatchData).toHaveBeenCalled();
    });

});
