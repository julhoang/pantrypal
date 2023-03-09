// TODO add id and key to .env      resource: https://trekinbami.medium.com/using-environment-variables-in-react-6b0a99d83cf5
const callAPI = async () => {
    console.log("trying api call...");
    try {
        const query = "celery";

        const appID = "8abfce08";
        const appKey = "c06091d57ff7df242e3138a49727e0c4";
        const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${appID}&app_key=${appKey}`);
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);  
    }
};

export {callAPI};