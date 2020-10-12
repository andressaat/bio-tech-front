import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { AppMaterialModule } from '@app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LayoutRoutingModule,
        AppMaterialModule
    ],
    // providers: [{ provide: AUTH_SERVICE, useClass: AuthService, deps: [UserService] }],
    declarations: [LayoutComponent,  HeaderComponent]
})
export class LayoutModule { }
