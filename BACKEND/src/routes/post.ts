import { Router, Request, Response } from "express";
import CommentController from "../controllers/CommentController";
import PostController from "../controllers/PostController";
import { CommentRepository } from "../repositories/CommentRepository";
import PostCommentRepository from "../repositories/PostCommentRepository";
import PostRepository from "../repositories/PostRepository";
import PostUserRepository from "../repositories/PostUserRepository";
import UserRepository from "../repositories/UserRepository";
import CommentService from "../services/CommentService";
import PostCommentService from "../services/PostCommentService";
import PostService from "../services/PostService";
import PostUserService from "../services/PostUserService";
import UserService from "../services/UserService";

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