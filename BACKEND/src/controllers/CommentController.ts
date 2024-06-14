import CommentService from "../services/CommentService";
import PostCommentService from "../services/PostCommentService";
import UserService from "../services/UserService";
import { Request, Response } from "express";
import ageRequired from "../helpers/AgeRequiredHelper";
import handleError from "../helpers/ErrorSenderHelper";

export default class CommentController {
  #commentService: CommentService;
  #postCommentService: PostCommentService;
  #userService: UserService;

  constructor(
    commentService: CommentService,
    postCommentService: PostCommentService,
    userService: UserService
  ) {
    this.#commentService = commentService;
    this.#postCommentService = postCommentService;
    this.#userService = userService;
  }

  async getComments(req: Request, res: Response) {
    try {
      if (typeof req.params.post_id == "undefined") {
        throw {statusCode: 400, errorMessage:"El id del post a comentar es indefinido"};
      }

      let response = await this.#postCommentService.getPostComments(
        req.params.post_id
      );

      let commentsData;

      if (typeof response != "undefined") {
        //@ts-ignore;
        const promises = response.map(async (comment) => {
          //@ts-ignore
          let aux = await this.#commentService.getComments(comment.comment_id);
          return aux;
        });

        commentsData = await Promise.all(promises);
        console.log(
          "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        );
        console.log(commentsData);
        //@ts-ignore
        const promisesUsername = commentsData.map(async (comment) => {
          //Yas se que tengo que definir todos los errores puntualmente, pero que pereza
          if (comment == undefined) {
            throw "err";
          }
          if (typeof comment[0] == undefined) {
            throw "err";
          }
          if("creator_id" in comment[0]){
            let user = await this.#userService.getUserById(comment[0].creator_id);
            return {
              //@ts-ignore
              id: comment[0].id,
              //@ts-ignore
              content: comment[0].content,
              //@ts-ignore
              username: user[0].username,
            };
          }
        });
        Promise.all(promisesUsername).then((final) => {
          console.log("FINALLLLLLLLLLL");
          console.log(promisesUsername);
          res.json(final);
        });
      }
    } catch (e) {
      handleError(res,e);
    }
  }

  async commentPost(req: Request, res: Response) {
    const { content, post_id, user_id } = req.body;
    try {

      if(content == "" && !post_id && !user_id){
        throw {statusCode:400, errorMessage:"No pueden estar vacios los campo content, post_id ni user_id"};
      }

      if(content == "" && !post_id){
        throw {statusCode:400, errorMessage:"No pueden estar vacios los campo content ni post_id"};
      }

      if(content == "" && !user_id){
        throw {statusCode:400, errorMessage:"No pueden estar vacios los campos content ni user_id"};
      }

      if(!user_id && !post_id){
        throw {statusCode:400, errorMessage:"No pueden estar vacios los campos user_id ni post_id"};
      }

      if(content == ""){
        throw {statusCode: 400, errorMessage:"No puede estar vacio el campo content"};
      }

      if(!post_id){
        throw {statusCode: 400, errorMessage: "No puede estar vacio el campo post_id"};
      }

      if(!user_id){
        throw {statusCode:400, errorMessage:"No puede estar vacio el campo user_id"};
      }

      if (content == null || post_id == null || user_id == null) {
        throw {statusCode: 400, errorMessage:"Alguno de los campos está vacio"};
      }
      if (typeof user_id != "number") {
        throw {statusCode: 400, errorMessage:"user_id no es numerico"};
      }
      if (typeof content != "string") {
        throw {statusCode: 400, errorMessage:"content no es de tipo string"};
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
      let response = await this.#commentService.createNewComment({content,creator_id,});
      console.log("AHORA ESTO Y LISTO");
      console.log(response);
      let comment_id = response;

      console.log(post_id);
      console.log(comment_id);
      await this.#postCommentService.createNewPostComment({
        post_id,
        comment_id,
      });
      res.send("ok"); // => Esto lo tengo que cambiar
    } catch (err) {
      handleError(res, err);
    }
  }
}
