// we tried using the CovidData as the interface but its better to just use the key value pairs to get the intellisense
type CoivdData = Record<string, string | number>

export interface BovidData {
  county: string,
  country_fips: string,
  county_population:string,
  covid_19_community_level: string,
  covid_cases_per_100k: string,
  covid_hospital_admissions_per_100k:string,
  covid_inpatient_bed_utilization:string,
  data_update:string,
  health_service_area:string,
  health_service_area_number:string,
  health_service_area_popualtion:string,
  state:string
}

async function fetchCovidData():Promise<string[]> {
  const apiUrl = "http://127.0.0.1:5000/api/covid-data";
  try {
    const response = await fetch(apiUrl);

    if(!response.ok) {
      throw new Error(`Response Status: ${response.status}`)
    }

    const jsonFromApi = await response.json();
    console.log("data from covid_data.ts which we get from covid_data_api.py", jsonFromApi);
    return jsonFromApi;

  } catch(error) {
    console.log(error as Error["message"])
  }
  return ["CovidData.ts has failed", "Check it"]
}

export default fetchCovidData