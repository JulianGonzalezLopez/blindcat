export default function generateID(){
    const uuid = crypto.randomUUID();
    return uuid;
}