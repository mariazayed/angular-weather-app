import { Injectable } from '@angular/core';
import {
    AngularFireLiteAuth,
    AngularFireLiteFirestore,
} from 'angularfire-lite';
import {
    first,
    switchMap,
} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FireStoreService {

    constructor(public authService: AngularFireLiteAuth,
                public fireStoreService: AngularFireLiteFirestore) {
    }

    isAuth() {
        return this.authService.isAuthenticated();
    }

    signIn(email: string, password: string) {
        return this.authService.signin(email, password);
    }

    signUp(email: string, password: string) {
        return this.authService.signup(email, password);
    }

    getCities() {
        return this.authService.uid()
                .pipe(switchMap((uid) => {
                    return this.fireStoreService.read(`${ uid }`);
                }));
    }

    addCity(name: string) {
        return this.authService.uid()
                .pipe(switchMap((uid) => {
                    return this.fireStoreService
                            .write(`${ uid }/${ name }`, {
                                name,
                                added: new Date(),
                            })
                            .pipe(first());
                }), first());
    }

}
