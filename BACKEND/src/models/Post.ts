import openConnection from "../connection.js"

interface Post{
    id?: number,
    title: string,
    content: string
};

async function createNewPost(post : Post){
    try{
        if(post.title == null || post.content == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }

        let connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [rows, fields] = await connection.execute("INSERT INTO posts(title, content) VALUES (?,?)",[post.title, post.content]);    
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
                console.log("Posts:");
                console.log(results);
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
}