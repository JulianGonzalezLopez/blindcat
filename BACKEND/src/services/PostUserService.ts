import PostUserRepository from "../repositories/PostUserRepository";

export default class PostUserService{
    #postUserRepository: PostUserRepository;

    constructor(postUserRepository: PostUserRepository){
        this.#postUserRepository = postUserRepository;
    }

    async createNewUserPosts(userPost: UserPost){
        try{
            const result = this.#postUserRepository.createNewUsersPosts(userPost);
            return result;
        }
        catch(e){
            throw e;
        }
    }   

    async getUsersPosts(){
        try{
            const result = await this.#postUserRepository.getUsersPosts();
            return result;
        }
        catch(e){
            throw e;
        }
    }

    async getUserPosts(user_id: number){
            const result = await this.#postUserRepository.getUserPosts(user_id);
            return result;
    }


    async getPostUser(post_id: number){
           const postUser = this.#postUserRepository.getPostUser(post_id); 
           return postUser;
    }

    async getPostsUsers(posts_ids: Array<number> = []){
            const postsUsers = await this.#postUserRepository.getPostsUsers(posts_ids);
            return postsUsers;
    }

    async getUserPost(userPost: UserPost){
            const userPostData = await this.#postUserRepository.getUserPost(userPost);
            return userPostData;
    }

    async createOpenedPost(userPost: UserPost){
            const result = this.#postUserRepository.createOpenedPost(userPost);
            return result;
    }

    async getOpenedPostsCount(post_id: number){
            const openedPostsCount = this.#postUserRepository.getOpenedPostsCount(post_id);
            return openedPostsCount;
    }
}