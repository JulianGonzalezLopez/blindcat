import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthHelper from "../helpers/AuthHelper";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";
import CommentService from "../services/CommentService";
import { CommentRepository } from "../repositories/CommentRepository";
import PostUserService from "../services/PostUserService";
import PostUserRepository from "../repositories/PostUserRepository";
import PostService from "../services/PostService";
import PostRepository from "../repositories/PostRepository";

const router = Router();
const UserC = new UserController(new UserService(new UserRepository()), new PostUserService( new PostUserRepository), new CommentService(new CommentRepository()), new PostService( new PostRepository()) , new AuthHelper());

router.get("/:username/interactions", UserC.getInteractions.bind(UserC));


export default router;