import {
    Component,
    OnInit,
} from '@angular/core';
import { FireStoreService } from '../../services/fb/fire-store.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [ './signup.component.css' ],
})
export class SignupComponent implements OnInit {

    // @ts-ignore
    errorMessage;

    constructor(public fb: FireStoreService, public router: Router) {
    }

    ngOnInit() {
    }

    // @ts-ignore
    signup(e) {
        this.fb.signUp(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
            this.router.navigateByUrl('');
        }, (err) => {
            this.errorMessage = err;
            setTimeout(() => this.errorMessage = '', 2000);
        });
    }

}
