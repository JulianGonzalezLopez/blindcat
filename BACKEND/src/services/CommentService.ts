import { CommentRepository } from "../repositories/CommentRepository";

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

    async getComments(comment_id: number){
        try{
            let comments = await this.#commentRepository.getComments(comment_id);
            console.log(comments);
            return comments;
        }
        catch(e){
            throw e;
        }
    }

    

}