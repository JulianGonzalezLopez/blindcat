export default function ageRequired(age: Date){

    let creationDate = new Date(age);
    let actualDate = new Date(Date.now());
    //@ts-ignore
    console.log(creationDate);
    console.log(actualDate);
    //@ts-ignore
    let differenceMS = actualDate - creationDate;
    let differenceMin = Math.round(differenceMS / (1000 * 60));
    console.log("Diferencia < 4 ");
    console.log(differenceMin < 4)
    if(differenceMin < 4){
      throw {statusCode:403, errorMessage:"Necesitas esperar 5 minutos para interactuar con el sitio"};
    }
    console.log("La diferencia en minutos es: ", differenceMin);
  };