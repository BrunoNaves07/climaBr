import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Weather } from 'src/domain/entities/weather';
import { LoadWeatherService } from 'src/domain/services/load-weather.service';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage {
  weather: Weather;
  today = new Date();

  hasError: boolean = false;
  errorMessage: string;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly activateRoute: ActivatedRoute,
    private readonly weatherService: LoadWeatherService
  ) { }

  ionViewDidEnter() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.loadWeather(Number.parseInt(id));
  }

  getCurrentDate() {
    const today = new Date();
    const weekDays = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado'
    ];
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');

    return `${weekDays[today.getDay()]}, ${day}/${month}`;
  }

  async loadWeather(cityId: number) {
    try {
      this.hasError = false;
      this.weather = await this.weatherService.LoadByCity(cityId);
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
    }

  }

  async onSeeDetails() {
    const modal = await this.modalCtrl.create({
      component: WeatherDetailsComponent,
      componentProps: {
        weatherDetails: this.weather.details,
      },
    });
    modal.present();
  }

}
