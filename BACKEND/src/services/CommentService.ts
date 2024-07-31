import { CommentRepository } from "../repositories/CommentRepository";

export default class CommentService{
    #commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository){
        this.#commentRepository = commentRepository;
    }

    async createNewComment(comment: Comment){
            const result = this.#commentRepository.createNewComment(comment);
            return result;
    }

    async getComments(comment_id: number){
            const comments = await this.#commentRepository.getComments(comment_id);
            console.log(comments);
            return comments;
    }

    async getCommentsByUID(user_id: number){
            const comments = await this.#commentRepository.getCommentsByUID(user_id);
            console.log(comments);
            return comments;
    }

    

}