import { CommentRepository } from "../repositories/CommentRepository.js";

export default class CommentService{
    #commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository){
        this.#commentRepository = commentRepository;
    }

    async createNewComment(comment: Comment){
        try{
            let result = this.#commentRepository.createNewComment(comment);
            return result;
        }
        catch(e){
            throw e;
        }
    }

    async getComments(){
        try{
            //@ts-ignore
            let comments = await this.#commentRepository.getComments()[0];
            return comments;
        }
        catch(e){
            throw e;
        }
    }

    

}