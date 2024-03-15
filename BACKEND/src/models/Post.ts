import pool from "../pool.js"

interface Post{
    id?: number,
    title: string,
    content: string,
    nsfw: string,
    creation_date: Date
};

async function createNewPost(post : Post){

    try{
        if(post.title == null || post.content == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }

        let nsfw: boolean;
        if (post.nsfw == "on"){ 
            nsfw = true
        }
        else{
            nsfw = false;
        } 
        console.log("Es nsfw? " + nsfw)

        if (pool instanceof Error || typeof pool === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [rows, fields] = await pool.execute("INSERT INTO posts(title, content, nsfw, creation_date) VALUES (?,?,?,?)",[post.title, post.content, nsfw, post.creation_date]);    
            pool.end();
            //@ts-ignore
            console.log('ID del registro insertado:', rows.insertId);
            //@ts-ignore
            return Promise.resolve(rows.insertId)
        }
    }
    catch(e){
        console.log(e);
        return e;
    }
}

async function getPosts(){
    
    try{
        if (pool instanceof Error || typeof pool === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await pool.execute("SELECT * from posts");

            if(Array.isArray(results) && results.length !== 0){
                return Promise.resolve(results);
            }
            else{
                return Promise.resolve([]);
            }
        }
    }
    catch(e){;
        Promise.reject([]);
    }
}

async function getPostPaged(page: string){
    const PAGE_SIZE = 5;

    let OFFSET = (Number.parseInt(page) - 1) * PAGE_SIZE;
    if(Number.parseInt(page) == 0){
        OFFSET = 0;
    }
    else if(Number.parseInt(page) == 1){
        OFFSET = PAGE_SIZE;
    }
    else{
        OFFSET = (Number.parseInt(page) - 1) * PAGE_SIZE;
    }
    
    try{
        if (pool instanceof Error || typeof pool === "undefined"){
            Promise.reject([]);
        }
        else{
            
            const [results, fields] = await pool.execute("SELECT * from posts ORDER BY creation_date LIMIT ? OFFSET ?", [PAGE_SIZE.toString(), OFFSET.toString()]);
            if(Array.isArray(results) && results.length !== 0){
                return Promise.resolve(results);
            }
            else{
                return Promise.resolve([]);
            }
        }
    }
    catch(e){
        Promise.reject([]);
    }
}


export default {
    createNewPost,
    getPosts,
    getPostPaged
}