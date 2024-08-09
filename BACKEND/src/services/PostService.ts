import PostRepository from "../repositories/PostRepository";

export default class PostService{
    #postRepository : PostRepository;
    
    constructor(postRepository: PostRepository){
        this.#postRepository = postRepository;
    }

    async createPost(post: Post){
            const result = await this.#postRepository.createPost(post);
            return result;
        }

    async getPosts(){
            const posts = await this.#postRepository.getPosts();
            return posts;
    }

    async getPost(post_id: number | string){
            const post = await this.#postRepository.getPost(post_id);
            return post;
    }

    async deleteEntry(uid:string, eid: number){
        const relationship = await this.#postRepository.confirmEntryOwnership(uid,eid);
        console.log(relationship);
        if(relationship == true){
                console.log("Llegamos a deletear la entrada?");
                await this.#postRepository.deleteEntry(eid);
                console.log("Llegamos a esta ejecucion");
                await this.#postRepository.deleteAssociatedComments(eid);
                console.log("Completamos a esta ejecucion");
        }
        else{
                throw {statusCode: 400, errorMessage: "No existe una relación entre UID y EID"};
        }
    }

    async getPostsByID(post_ids: number | string){
            const post = await this.#postRepository.getPostsByID(post_ids);
            return post;
    }

    async getPostsPaged(page:string, order: string = "new"){
            const posts = await this.#postRepository.getPostsPaged(page, order);
            return posts;
    }

    async getPostsByCategoryPaged(tag:string, page:string, order: string = "new"){
            const posts = await this.#postRepository.getPostsByCategoryPaged(tag, page, order);
            return posts;
    }
}