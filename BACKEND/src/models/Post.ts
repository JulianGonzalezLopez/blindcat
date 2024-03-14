import openConnection from "../connection.js"

interface Post{
    id?: number,
    title: string,
    content: string,
    nsfw: string,
    creation_date: Date
};

async function createNewPost(post : Post){

    let connection;

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
        connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [rows, fields] = await connection.execute("INSERT INTO posts(title, content, nsfw, creation_date) VALUES (?,?,?,?)",[post.title, post.content, nsfw, post.creation_date]);    
            connection.end();
            //@ts-ignore
            console.log('ID del registro insertado:', rows.insertId);
            //@ts-ignore
            return Promise.resolve(rows.insertId)
        }
    }
    catch(e){
        if(connection){
            connection.end();
        }
        console.log(e);
        return e;
    }
}

async function getPosts(){
    
    let connection;

    try{
        connection = await openConnection();

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
        connection && connection.end();
        Promise.reject([]);
    }
}

async function getPostPaged(page: string){
    let connection;
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
        connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            
            const [results, fields] = await connection.execute("SELECT * from posts ORDER BY creation_date LIMIT ? OFFSET ?", [PAGE_SIZE.toString(), OFFSET.toString()]);
            connection.end();
            console.log("RESULTADOS DEL PAGE SIZE Y OFFSET");
            console.log(results);
            if(Array.isArray(results) && results.length !== 0){
                return Promise.resolve(results);
            }
            else{
                return Promise.resolve([]);
            }
        }
    }
    catch(e){
        connection && connection.end();
        Promise.reject([]);
    }
}


export default {
    createNewPost,
    getPosts,
    getPostPaged
}