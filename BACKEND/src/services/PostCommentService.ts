import PostCommentRepository from "../repositories/PostCommentRepository";

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
            let postComments = await this.#postCommentRepository.getPostsCommets(post_id);
            console.log(postComments);
            return postComments;
        }
        catch(e){
            throw e;
        }
    }
}