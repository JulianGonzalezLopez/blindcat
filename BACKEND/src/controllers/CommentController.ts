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
      let pid: number;
      
      if (typeof req.params.post_id == "undefined") {
        throw {statusCode: 400, errorMessage:"El id del post a comentar es indefinido"};
      }

      if(typeof req.params.post_id != "number" && typeof req.params.post_id != "string"){
        throw {statusCode:400, errorMessage:"Tipo de dato no admitido"};
      }

      if(typeof req.params.post_id == "string"){
        pid = Number.parseInt(req.params.post_id);
      }
      else{
        pid = req.params.post_id;
      }

      const comments = await this.#commentService.getComments(pid);
      res.status(200).send(comments);

    } catch (e) {
      handleError(res,e);
    }
  }

  async deleteComment(req: Request, res: Response){
    try{
      const uid = req.body.user_id;
      let cid: string | number = req.params.comment_id;  
      //FALTAN VERIFICACIONES
      await this.#commentService.deleteComment(cid,uid);
      res.status(200).send("Commentario eliminado con exito");
  
    }
    catch(err){
      handleError(res,err);
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

      if(content.length > 299){
        throw {statusCode: 400, errorMessage:"Un comentario puede tener 300 caracteres como maximo"};
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
      if (typeof user_id != "string") {
        throw {statusCode: 400, errorMessage:"user_id no es numerico"};
      }
      if (typeof content != "string") {
        throw {statusCode: 400, errorMessage:"content no es de tipo string"};
      }

      console.log("Nos centramos en esto");
      const cid = await this.#commentService.createNewComment(content);
      await this.#commentService.createNewPostCommentRelationship(cid, post_id);
      await this.#commentService.createNewUserCommentRelationship(cid, user_id);
      console.log("Se creo relacion en el comentario");
      res.status(201).send("ok");
    } catch (err) {
      handleError(res, err);
    }
  }
}
