import CommentService from "../services/CommentService.js";
import PostCommentService from "../services/PostCommentService.js";
import UserService from "../services/UserService.js";
import {Request, Response} from "express";

export default class CommentController{
    #commentService: CommentService;
    #postCommentService: PostCommentService;
    #userService: UserService;

    constructor(commentService: CommentService, postCommentService: PostCommentService, userService: UserService){
        this.#commentService = commentService;
        this.#postCommentService = postCommentService;
        this.#userService = userService;
    }

    async getComments(req: Request, res: Response) {
        let response = await this.#postCommentService.getPostComments(req.params.post_id);
      
        //@ts-ignore;
        let commentsData = [];
        if (typeof response != "undefined") {
                  //@ts-ignore;
          const promises = response.map(async (comment) => {
            //@ts-ignore
            let aux = await Comment.getComments(comment.comment_id);
            return aux;
          });
      
          //Esperas que procese usando `await`
          let commentsData;
          try {
            commentsData = await Promise.all(promises);
          } catch (e) {
            console.error("There was an error:", e);
          }
      
          //@ts-ignore
          const promisesUsername = commentsData.map(async (comment) => {
            //@ts-ignore
            let username = await this.#userService.getUserById(comment.creator_id);
            return {
              //@ts-ignore
              id: comment.id,
              //@ts-ignore
              content: comment.content,
              username: username,
            };
          });
      
          Promise.all(promisesUsername).then((final) => {
            res.json(final);
          });
        }
      }


      async commentPost(req: Request, res: Response) {
        const { content, post_id, user_id } = req.body;
        try {
          let userData = await this.#userService.getUserDataById(user_id);
          //@ts-ignore
          ageRequired(userData.creation_date);
          //@ts-ignore
          let response = await this.#commentService.createNewComment({ content, user_id });
          let comment_id = response;
          await this.#postCommentService.createNewPostComment({ post_id, comment_id });
          res.send("ok"); // => Esto lo tengo que cambiar
        } catch (err) {
          console.log("Error creating a Post in");
          res.status(400).send({"error":err});
        }
      }

}