import { Component } from '@angular/core';
import { FireStoreService } from '../../services/fb/fire-store.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
})
export class LoginComponent {
    errorMessage = '';

    constructor(public fireStoreService: FireStoreService,
                public router: Router) {
    }

    login(event: any) {
        const email = event.target.email.value;
        const password = event.target.password.value;

        this.fireStoreService.signIn(email, password)
                .pipe(first())
                .subscribe(() => {
                    this.router.navigateByUrl('');
                }, (err) => {
                    this.errorMessage = err;
                    setTimeout(() => this.errorMessage = '', 2000);
                });
    }

}
