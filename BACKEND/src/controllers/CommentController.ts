import CommentService from "../services/CommentService.js";
import PostCommentService from "../services/PostCommentService.js";
import UserService from "../services/UserService.js";
import {Request, Response} from "express";
import ageRequired from "../helpers/AgeRequiredHelper.js";

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
        if(typeof req.params.post_id == "undefined"){
          throw "error";
        }

        let response = await this.#postCommentService.getPostComments(req.params.post_id);

        let commentsData;

        if (typeof response != "undefined") {
                  //@ts-ignore;
          const promises = response.map(async (comment) => {
            //@ts-ignore
            let aux = await this.#commentService.getComments(comment.comment_id);
            return aux;
          });
      
          try {
            commentsData = await Promise.all(promises);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(commentsData);
          } catch (e) {
            console.error("There was an error:", e);
          }
      
          //@ts-ignore
          const promisesUsername = commentsData.map(async (comment) => {
            console.log("esto nos interesa");
            console.log(comment);
            console.log(comment.creator_id);
            //@ts-ignore
            let user = await this.#userService.getUserById(comment[0].creator_id);
            return {
              //@ts-ignore
              id: comment[0].id,
              //@ts-ignore
              content: comment[0].content,
              //@ts-ignore
              username: user[0].username,
            };
          });
      
          Promise.all(promisesUsername).then((final) => {
            console.log("FINALLLLLLLLLLL");
            console.log(promisesUsername);
            res.json(final);
          });
        }
      }


      async commentPost(req: Request, res: Response) {
        const { content, post_id, user_id } = req.body;
        try {
          if(content == null || post_id == null || user_id == null){
            throw {"en":"At least one of the inputs is null"};
          }
          if(typeof user_id != "number"){
            throw "err";
          }
          if(typeof content != "string"){
            throw "err";
          }
          console.log("MINIMO");
          let userData = await this.#userService.getUserDataById(user_id);
          console.log("MINIMO X2");
          console.log(userData);
          //@ts-ignore
          ageRequired(userData.creation_date);
          //@ts-ignore
          console.log("LLEGÓ ACÁ");
          console.log(user_id);
          let creator_id = user_id;
          let response = await this.#commentService.createNewComment({ content, creator_id });
          console.log("AHORA ESTO Y LISTO");
          console.log(response);
          let comment_id = response;

          console.log(post_id)
          console.log(comment_id);
          await this.#postCommentService.createNewPostComment({ post_id, comment_id });
          res.send("ok"); // => Esto lo tengo que cambiar
        } catch (err) {
          console.log("Error creating a Post in");
          res.status(400).send({"error":err});
        }
      }

}