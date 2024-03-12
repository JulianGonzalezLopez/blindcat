import openConnection from "../connection.js"

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
        let connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [rows, fields] = await connection.execute("INSERT INTO posts(title, content, nsfw, creation_date) VALUES (?,?,?,?)",[post.title, post.content, nsfw, post.creation_date]);    
            console.log(rows);
            connection.end();
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
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT * from posts");
            connection.end();

            if(Array.isArray(results) && results.length !== 0){
                return Promise.resolve(results);
            }
            else{
                return Promise.resolve([]);
            }
        }
    }
    catch(e){
        console.log(e);
        Promise.reject([]);
    }
}

async function getPostPaged(page: string){
    const PAGE_SIZE = 10;
    const OFFSET = (Number.parseInt(page) - 1) * PAGE_SIZE;
    try{
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT * from posts LIMIT ? OFFSET ? ORDER BY creation_date", [PAGE_SIZE, OFFSET]);
            connection.end();

            if(Array.isArray(results) && results.length !== 0){
                return Promise.resolve(results);
            }
            else{
                return Promise.resolve([]);
            }
        }
    }
    catch(e){
        console.log(e);
        Promise.reject([]);
    }
}


export default {
    createNewPost,
    getPosts,
    getPostPaged
}