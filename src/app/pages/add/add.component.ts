import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../services/weather/weather.service';
import { FireStoreService } from '../../services/fb/fire-store.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: [ './add.component.scss' ],
})
export class AddComponent implements OnInit, OnDestroy {

    // @ts-ignore
    temp: number;
    // @ts-ignore
    city = 'Rome';
    // @ts-ignore
    state: string;
    capitals = [];
    // @ts-ignore
    selectedCity;
    // @ts-ignore
    cardCity;
    showNote = false;
    followedCM = false;
    // @ts-ignore
    sub1;


    constructor(public http: HttpClient, public weather: WeatherService, public fb: FireStoreService) {
    }

    ngOnInit() {
        // getting the city placeID
        this.weather.getWeather(this.city).subscribe((payload: any) => {
            this.state = payload.weather[0].main;
            this.temp = Math.ceil(Number(payload.main.temp));
        });

        // @ts-ignore
        this.http.get('https://restcountries.eu/rest/v2/all').pipe((first())).subscribe((countries: Array<any>) => {
            countries.forEach((country: any) => {
                if (country.capital.length) {
                    // @ts-ignore
                    this.capitals.push(country.capital);
                }
            });
            this.capitals.sort();
        });

        this.sub1 = this.fb.getCities().subscribe((cities) => {
            Object.values(cities).forEach((city: any) => {
                if (city.name === 'Rome') {
                    this.followedCM = true;
                }
            });
        });
    }

    // @ts-ignore
    selectCity(city) {
        // @ts-ignore
        if (this.capitals.includes(city)) {
            this.cardCity = city;
            this.showNote = false;
        } else if (city.leading > 0) {
            this.showNote = true;
        }
    }

    addCityOfTheMonth() {
        this.fb.addCity('Rome').subscribe(() => {
            this.followedCM = true;
        });
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
    }

}
