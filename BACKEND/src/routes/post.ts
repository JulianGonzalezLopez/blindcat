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
import PostCategoryService from "../services/PostCategoryService";
import PostCategoryRepository from "../repositories/PostCategoryRepository";

const router = Router();
const PostC = new PostController(new PostService(new PostRepository()), new PostUserService(new PostUserRepository), new UserService(new UserRepository()), new PostCategoryService(new PostCategoryRepository));
const CommentC = new CommentController(new CommentService(new CommentRepository()), new PostCommentService(new PostCommentRepository()), new UserService(new UserRepository()));

router.post("/posts/comment", CommentC.commentPost.bind(CommentC)); //FALTA TEST

router.post("/posts/",PostC.createPost.bind(PostC)); //FALTA TEST

router.get("/entry", PostC.getPost.bind(PostC));

router.delete("/entry/:post_id", PostC.deleteEntry.bind(PostC));

router.get("/posts/", PostC.getPosts.bind(PostC));

router.get("/posts/:post_id/comments/", CommentC.getComments.bind(CommentC));

router.post("/posts/opened", PostC.createOpenedPost.bind(PostC)); //FALTA TEST



export default router;