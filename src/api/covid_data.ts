type CoivdData = Record<string, string | number>

async function fetchCovidData():Promise<CoivdData[]> {
  const apiUrl = "https://data.cdc.gov/resource/3nnm-4jni.json";
  try {
    const response = await fetch(apiUrl);
    if(!response.ok) {
      throw new Error(`Response Status: ${response.status}`)
    }
    const jsonFromApi = await response.json();
    console.log(jsonFromApi);
    return jsonFromApi;
  } catch(error) {
    console.log(error as Error["message"])
  }

  return [{'error': "no data from fetchCovidDataFunction"}]
}

export default fetchCovidData