import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CountryListComponent} from "./components/country-list/country-list.component";
import {CountryPageComponent} from "./components/country-page/country-page.component";

const routes: Routes = [
  {path: '', component: CountryListComponent},
  {path: 'country/:emoji', component: CountryPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
