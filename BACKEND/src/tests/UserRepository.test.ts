// UserService.test.ts
import UserService from '../services/UserService';
import UserRepository from '../repositories/UserRepository';

// Creamos un mock para UserRepository
jest.mock('../repositories/UserRepository');

describe('UserService', () => {
    beforeEach(() => {
        // Limpiar cualquier mock antes de cada prueba
        jest.clearAllMocks();
    });

    it('should call getUsers method from UserRepository', async () => {
        // Mockeamos el método getUsers de UserRepository
        const mockGetUsers = jest.fn().mockResolvedValue([{ username: 'user1', cantidad_posts: 10, karma: 20 }]);
        UserRepository.prototype.getUsers = mockGetUsers;

        // Creamos una instancia de UserService con el UserRepository mockeado
        const userService = new UserService(new UserRepository());

        // Llamamos al método getUsers de UserService
        await userService.getUsers();

        expect(mockGetUsers).toHaveBeenCalled();
    });

    // Puedes agregar más pruebas para los otros métodos de UserService según sea necesario
});