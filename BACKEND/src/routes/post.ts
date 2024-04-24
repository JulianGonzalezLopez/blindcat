import { Router, Request, Response } from "express";
import CommentController from "../controllers/CommentController.js";
import PostController from "../controllers/PostController.js";
import { CommentRepository } from "../repositories/CommentRepository.js";
import PostCommentRepository from "../repositories/PostCommentRepository.js";
import PostRepository from "../repositories/PostRepository.js";
import PostUserRepository from "../repositories/PostUserRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import CommentService from "../services/CommentService.js";
import PostCommentService from "../services/PostCommentService.js";
import PostService from "../services/PostService.js";
import PostUserService from "../services/PostUserService.js";
import UserService from "../services/UserService.js";

const router = Router();
const PostC = new PostController(new PostService(new PostRepository()), new PostUserService(new PostUserRepository), new UserService(new UserRepository()));
const CommentC = new CommentController(new CommentService(new CommentRepository()), new PostCommentService(new PostCommentRepository()), new UserService(new UserRepository()));

router.get("/",(req,res)=>{
    res.send("PAGINA LOGIN");
});

router.post("/comment", CommentC.commentPost.bind(CommentC)); //FALTA TEST

router.post("/",PostC.createPost.bind(PostC)); //FALTA TEST

router.get("/all", PostC.getPosts.bind(PostC));

router.get("/:post_id/comments/", CommentC.getComments.bind(CommentC));

router.post("/opened", PostC.createOpenedPost.bind(PostC)); //FALTA TEST

export default router;