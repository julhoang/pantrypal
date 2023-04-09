export function queryString(
  itemParams: string[],
  healthParams: string[],
  mealTypeParams: string[]
) {
  const appID = "8abfce08";
  const appKey = "c06091d57ff7df242e3138a49727e0c4";
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=any&app_id=${appID}&app_key=${appKey}&random=true&`;

  const q = "q";
  const health = "health";
  const mealType = "mealType";

  const searchParams = new URLSearchParams();

  for (const item in itemParams) {
    searchParams.append(q, itemParams[item]);
  }

  for (const healthStr in healthParams) {
    searchParams.append(health, healthParams[healthStr]);
  }

  for (const mealTypeStr in mealTypeParams) {
    searchParams.append(mealType, mealTypeParams[mealTypeStr]);
  }

  const finalQueryString = baseURL + searchParams.toString();

  return finalQueryString;
}

const getRecipe = async (query: string) => {
  try {
    const res = await fetch(query);
    const data = await res.json();

    return data.hits;
  } catch (err) {
    console.log(err);
  }
};

export { getRecipe };
