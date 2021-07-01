import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    first,
    map,
} from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class WeatherService {

    private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    private readonly forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    private readonly appID = environment.appID;

    constructor(public httpClient: HttpClient) {
    }

    getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
        return this.httpClient.get(`${ this.baseURL }${ city }&units=${ metric }&APPID=${ this.appID }`)
                .pipe((first()));
    }

    getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {

        return this.httpClient.get(`${ this.forecastURL }${ city }&units=${ metric }&APPID=${ this.appID }`)
                .pipe(
                        first(),
                        // @ts-ignore
                        map((weather) => weather['list']));
    }
}
