import { Coordinate } from "src/domain/entities/coordinates";
import { Weather } from "src/domain/entities/weather";
import { WeatherRepository } from "src/domain/services/protocols/weather-repository";

export class FakeWeatherRepository extends WeatherRepository {
  weather: Weather = {
    currentTemp: 25,
    details: [
      {
        conditions: 'Céu Limpo',
        conditionIconUrl: 'http://openweathermap.org/img/wn/01d@2x.png',
        pop: 70,
        humidity: 30,
        minTemp: 18,
        maxTemp: 31,
      },
      {
        conditions: 'Tempestade',
        conditionIconUrl: 'http://openweathermap.org/img/wn/11d@2x.png',
        pop: 90,
        humidity: 45,
        minTemp: 16,
        maxTemp: 28,
      },
      {
        conditions: 'Nublado',
        conditionIconUrl: 'http://openweathermap.org/img/wn/04d@2x.png',
        pop: 30,
        humidity: 68,
        minTemp: 17,
        maxTemp: 30,
      },
    ],
  };

  async load(coord: Coordinate): Promise<Weather> {
    return this.weather;
  }
}
