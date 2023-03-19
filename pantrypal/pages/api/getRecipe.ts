const getRecipe = async (query: string) => {
    console.log("Trying api call...");
    try {
        const res = await fetch(query);
        const data = await res.json();
        console.log(data);

        return data;
    } catch (err) {
        console.log(err);  
    }
};

export {getRecipe};