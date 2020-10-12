import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OauthInterceptor } from '../auth/oauth.interceptor';
import { AppMaterialModule } from '../app-material/app-material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        AppMaterialModule
    ],
    declarations: [LoginComponent],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: OauthInterceptor,
        multi: true,
    },
]
})
export class LoginModule {
}
