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

    async createNewPostCommentRelationship(cid: number, pid: number){
        const result = await this.#commentRepository.createNewPostCommentRelationship(cid, pid);
        return result;
    }

    async createNewUserCommentRelationship(cid: number, uid: string){
        const result = await this.#commentRepository.createNewUserCommentRelationship(cid, uid);
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

    async deleteComment(cid, uid){
        console.log(cid);
        console.log(uid);
        const relationship = await this.#commentRepository.confirmCommentOwnership(cid, uid);
        if(relationship){
                await this.#commentRepository.deleteComment(cid);
        }
        else{
                throw {statusCode: 400, errorMessage: "No existe una relacion entre ese uid y cid"};
        }
    }
    

}