export default function generateID(){
    let uuid = crypto.randomUUID();
    return uuid;
}