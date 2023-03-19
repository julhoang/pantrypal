export function queryString(itemParams: string[], healthParams: string[], mealTypeParams: string[]) {
    // TODO add id and key to .env      resource: https://trekinbami.medium.com/using-environment-variables-in-react-6b0a99d83cf5
    const appID = "8abfce08";
    const appKey = "c06091d57ff7df242e3138a49727e0c4";
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=any&app_id=${appID}&app_key=${appKey}&`;
    
    const q = "q";
    const health= "health";
    const mealType = "mealType";

    const searchParams = new URLSearchParams();

    for (const item in itemParams){
        searchParams.append(q, itemParams[item]);
    }

    for (const healthStr in healthParams){
        searchParams.append(health, healthParams[healthStr]);
    }
    
    for (const mealTypeStr in mealTypeParams){
        searchParams.append(mealType, mealTypeParams[mealTypeStr]);
    }

    // for (const p of searchParams) {
    //     console.log(p);
    //     // Double check params
    // }
    
    const finalQueryString = baseURL + searchParams.toString();
    // console.log("FINAL URL: " + finalQueryString);

    return finalQueryString;
}
