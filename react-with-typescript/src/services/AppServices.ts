

export class AppService {
    public async getCountryDetails(name:string):Promise<any>{
        const response = await fetch(`https://restcountries.com/v2/name//${name}`);
        return await response.json();
    }
    public async getWeather(capital:string):Promise<any>{
        const response = await fetch(`http://api.weatherstack.com/current?access_key=f97561106c9153d29b4081f510940097&query=${capital}`);
        return await response.json();

    }
}