import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {HttpClientModule} from "@angular/common/http";
import {UsersComponent} from "./users/users.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {registerLocaleData} from "@angular/common";
import localeES from '@angular/common/locales/es-CO';
import { FormComponent } from './users/form.component';

registerLocaleData(localeES, 'CO');

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'users/form', component: FormComponent},
  {path: 'users/form/:id', component: FormComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
