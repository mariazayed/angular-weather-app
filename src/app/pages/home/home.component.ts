import {
    Component,
    OnInit,
} from '@angular/core';
import { FireStoreService } from '../../services/fb/fire-store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
})
export class HomeComponent implements OnInit {
    cities: any;

    constructor(public fireStoreService: FireStoreService) {
    }

    ngOnInit() {
        this.cities = this.fireStoreService.getCities();
    }
}
