import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryPageComponent } from './components/country-page/country-page.component';
import { CountryPreviewComponent } from './components/country-preview/country-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryPageComponent,
    CountryPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
