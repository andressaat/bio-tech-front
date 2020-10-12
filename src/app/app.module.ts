import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
// import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OauthInterceptor } from './auth/oauth.interceptor';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { DateTimeFormatPipe } from './shared/pipes/date-time-format.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OauthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
