import { CommentRepository } from "../repositories/CommentRepository";

export default class CommentService{
    #commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository){
        this.#commentRepository = commentRepository;
    }

    async createNewComment(content: string){
            const cid = await this.#commentRepository.createNewComment(content);
            return cid;
    }

    async createNewCommentRelationship(cid: number, pid: number, uid: string){
        const result = await this.#commentRepository.createNewCommentRelationship(cid, pid, uid);
        return result;
    }

    async getComments(comment_id: number){
            const comments = await this.#commentRepository.getCommentsByPID(comment_id);
            console.log(comments);
            return comments;
    }

    async getCommentsByUID(user_id: number){
            const comments = await this.#commentRepository.getCommentsByUID(user_id);
            console.log(comments);
            return comments;
    }

    

}