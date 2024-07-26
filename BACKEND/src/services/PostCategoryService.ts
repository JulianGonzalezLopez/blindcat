import PostCategoryRepository from "../repositories/PostCategoryRepository";
export default class PostCategoryService{
    #postCategoryRepository: PostCategoryRepository;

    constructor(postCategoryRepository: PostCategoryRepository){
        this.#postCategoryRepository = postCategoryRepository;
    }

    async createNewCategoryPost(categoryPost: CategoryPost){
        try{
            const result = this.#postCategoryRepository.createNewCategoryPost(categoryPost);
            return result;
        }
        catch(e){
            throw e;
        }
    }   

    // async getUsersPosts(){
    //     try{
    //         let result = await this.#postUserRepository.getUsersPosts();
    //         return result;
    //     }
    //     catch(e){
    //         throw e;
    //     }
    // }

    // async getPostUser(post_id: number){
    //     try{
    //        let postUser = this.#postUserRepository.getPostUser(post_id); 
    //        return postUser;
    //     } 
    //     catch(e){
    //         throw e;
    //     }
    // }

    // async getPostsUsers(posts_ids: Array<number> = []){
    //     try{
    //         let postsUsers = await this.#postUserRepository.getPostsUsers(posts_ids);
    //         return postsUsers;
    //     }
    //     catch(e){
    //         throw e;
    //     }
    // }

    // async getUserPost(userPost: UserPost){
    //     try{
    //         let userPostData = await this.#postUserRepository.getUserPost(userPost);
    //         return userPostData;
    //     }
    //     catch(e){
    //         throw e;
    //     }
    // }

    // async getOpenedPostsCount(post_id: number){
    //     try{
    //         let openedPostsCount = this.#postUserRepository.getOpenedPostsCount(post_id);
    //         return openedPostsCount;
    //     }
    //     catch(e){
    //         throw e;
    //     }
    // 
}