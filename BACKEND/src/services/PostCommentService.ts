import PostCommentRepository from "../repositories/PostCommentRepository";

export default class PostCommentService{
    #postCommentRepository: PostCommentRepository;

    constructor(postCommentRepository: PostCommentRepository){
        this.#postCommentRepository = postCommentRepository;
    }


    async createNewPostComment(postComment: PostComment){
            const result = await this.#postCommentRepository.createNewPostComment(postComment);
            return result;
    }

    async getPostComments(post_id: any){
            const postComments = await this.#postCommentRepository.getPostsCommets(post_id);
            console.log(postComments);
            return postComments;
    }
}