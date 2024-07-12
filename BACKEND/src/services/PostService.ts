import PostRepository from "../repositories/PostRepository";

export default class PostService{
    #postRepository : PostRepository;
    
    constructor(postRepository: PostRepository){
        this.#postRepository = postRepository;
    }

    async createPost(post: Post){
        try{
            let result = await this.#postRepository.createPost(post);
            return result;
        }
        catch(e){
            throw e;
        }
    }

    async getPosts(){
        try{
            let posts = await this.#postRepository.getPosts();
            return posts;
        }
        catch(e){
            throw e;
        }
    }

    async getPost(post_id: number | string){
        try{
            let post = await this.#postRepository.getPost(post_id);
            return post;
        }
        catch(e){
            throw e;
        }
    }

    async getPostsPaged(page:string, order: string = "new"){
        try{
            let posts = await this.#postRepository.getPostsPaged(page, order);
            return posts;
        }
        catch(e){
            throw e;
        }
    }

    async getPostsByCategoryPaged(tag:string, page:string, order: string = "new"){
        try{
            let posts = await this.#postRepository.getPostsByCategoryPaged(tag, page, order);
            return posts;
        }
        catch(e){
            throw e;
        }
    }
}