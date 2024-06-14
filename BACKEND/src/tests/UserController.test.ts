import UserController from "../controllers/UserController";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";
import AuthHelper from "../helpers/AuthHelper";
import { getMockReq, getMockRes } from '@jest-mock/express'


jest.mock("../services/UserService");
jest.mock("../repositories/UserRepository");
jest.mock("../helpers/AuthHelper");

describe('UserController - createNewUser',()=>{
    beforeEach(() => {
        // Limpiar cualquier mock antes de cada prueba
        jest.clearAllMocks();
    });

    it('Deberia fallar (username 17 caracteres)',()=>{

        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepepepepepepepep",
            password: "pepe",
            rePassword: "pepe"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();

    });

    it('Deberia fallar (password 17 caracteres)',()=>{

        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepe",
            password: "pepepepepepepepep",
            rePassword: "pepepepepepepepep"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();

    });

    it('Deberia fallar ( username nulo)',()=>{

        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "pepe",
            rePassword: "pepe"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();

    })

    it('Deberia fallar (password nulo)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepe",
            password: "",
            rePassword: "pepe"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar (rePassword nulo)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "pepe",
            rePassword: ""
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar (diff passwords)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "pepe",
            rePassword: "pepe2"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar ( username y password nulo)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "",
            rePassword: "pepe"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar ( username, password y rePassword nulo)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "",
            rePassword: ""
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar ( username y rePassword nulo)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "pepe",
            rePassword: ""
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar ( password y rePassword nulo)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepe",
            password: "",
            rePassword: ""
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar ( username no string)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: 1,
            password: "pepe",
            rePassword: "pepe"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar (password no string)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepe",
            password: 2,
            rePassword: "pepe"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar (rePassword no string)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "pepe",
            rePassword: 2
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar (password y rePassword no string)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: 2,
            rePassword: 2
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar (username y password no string)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: 2,
            password: 2,
            rePassword: "pepe"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia fallar (username y rePassword no string)',()=>{
        const mockCreateUser = jest.fn().mockReturnValue({statusCode:201, message:"ok"});
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: 2,
            password: "pepe",
            rePassword: 2
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).not.toHaveBeenCalled();
    })

    it('Deberia funcionar',()=>{
        const mockCreateUser = jest.fn().mockReturnValue(Promise.resolve({statusCode:201, message:"ok"}));
        UserService.prototype.createNewUser = mockCreateUser;

        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepe",
            password: "pepe",
            rePassword: "pepe"
        }});
        const { res } = getMockRes();
        userController.createUser(mockRequest, res); //Debe fallar el controller
        expect(mockCreateUser).toHaveBeenCalled();
    })
});

describe('UserController - loginUser', ()=>{

    it('Deberia funcionar',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepe",
            password: "pepe",
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).toHaveBeenCalled();
    })

    it('Deberia fallar (username nulo)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "pepe",
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });

    it('Deberia fallar (password nulo)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepe",
            password: "",
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });

    it('Deberia fallar (username y password nulo)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: "",
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });

    it('Deberia fallar (username no string)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: 3,
            password: "pepe",
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });

    it('Deberia fallar (password no string)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "",
            password: 44,
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });

    it('Deberia fallar (username y password no string)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: 3,
            password: 3,
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });

    it('Deberia fallar (username 17 caracteres)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepepepepepepepep",
            password: "pepe",
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });

    it('Deberia fallar (password 17 caracteres)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepe",
            password: "pepepepepepepepep",
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });

    it('Deberia fallar (username y password 17 caracteres)',()=>{
        const mockMatchData = jest.fn().mockReturnValue({status:true});
        //@ts-ignore
        AuthHelper.prototype.authorize = jest.fn().mockReturnValue(true);
        UserService.prototype.matchData = mockMatchData;
        
        const userController = new UserController(new UserService(new UserRepository()), new AuthHelper());
        const mockRequest = getMockReq({body: {
            username: "pepepepepepepepep",
            password: "pepepepepepepepep",
        }});
        const { res } = getMockRes();
        userController.loginUser(mockRequest, res); //Debe fallar el controller
        expect(mockMatchData).not.toHaveBeenCalled();
    });
});
