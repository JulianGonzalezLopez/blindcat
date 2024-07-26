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
        try{
            const result = await this.#postUserRepository.getUserPosts(user_id);
            return result;
        }
        catch(e){
            throw e;
        }
    }


    async getPostUser(post_id: number){
        try{
           const postUser = this.#postUserRepository.getPostUser(post_id); 
           return postUser;
        } 
        catch(e){
            throw e;
        }
    }

    async getPostsUsers(posts_ids: Array<number> = []){
        try{
            const postsUsers = await this.#postUserRepository.getPostsUsers(posts_ids);
            return postsUsers;
        }
        catch(e){
            throw e;
        }
    }

    async getUserPost(userPost: UserPost){
        try{
            const userPostData = await this.#postUserRepository.getUserPost(userPost);
            return userPostData;
        }
        catch(e){
            throw e;
        }
    }

    async createOpenedPost(userPost: UserPost){
        try{
            const result = this.#postUserRepository.createOpenedPost(userPost);
            return result;
        }
        catch(e){
            throw e;
        }
    }

    async getOpenedPostsCount(post_id: number){
        try{
            const openedPostsCount = this.#postUserRepository.getOpenedPostsCount(post_id);
            return openedPostsCount;
        }
        catch(e){
            throw e;
        }
    }


}