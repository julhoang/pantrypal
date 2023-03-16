// TODO add id and key to .env      resource: https://trekinbami.medium.com/using-environment-variables-in-react-6b0a99d83cf5

//ingr= takes either MIN = 3+, a MIN-MAX = 3-5, MAX = 5
//ingr= takes either MIN = 3%2B, a MIN-MAX = 3-5, MAX = 5

// &health=sugar-conscious&health=tree-nut-free&health=vegan

interface Query {
    mainQuery: string,
    ingr?: number,
    health?: String[]
}

// const paramsString = "q=URLUtils.searchParams&topic=api";
// const searchParams = new URLSearchParams(paramsString);

const callAPI = async (query:Query) => {
    console.log("trying api call...");
    try {
        const {mainQuery, ingr} = query;

        const appID = "8abfce08";
        const appKey = "c06091d57ff7df242e3138a49727e0c4";
        const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=any&q=${mainQuery}&app_id=${appID}&app_key=${appKey}&ingr=3%2B`);
        const data = await res.json();
        console.log(data);

        console.log(data.hits[0]);
        // return data;
    } catch (err) {
        console.log(err);  
    }
};

export {callAPI};