import PostCommentRepository from "../repositories/PostCommentRepository.js";

export default class PostCommentService{
    #postCommentRepository: PostCommentRepository;

    constructor(postCommentRepository: PostCommentRepository){
        this.#postCommentRepository = postCommentRepository;
    }


    async createNewPostComment(postComment: PostComment){
        try{
            let result = await this.#postCommentRepository.createNewPostComment(postComment);
            return result;
        }
        catch(e){
            throw e;
        }
    }

    async getPostComments(post_id: any){
        try{
            let postComments = this.#postCommentRepository.getPostsCommets(post_id);
        }
        catch(e){
            throw e;
        }
    }
}