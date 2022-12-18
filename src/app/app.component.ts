import {Component, OnInit} from '@angular/core';
import {CountriesService} from "./services/countries.service";
import {Observable} from "rxjs";
import {CountryInterface} from "./interfaces/country.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  getDataCountries$: Observable<CountryInterface[]> | undefined;

  constructor(private countryService: CountriesService) {
  }

  ngOnInit() {
    this.getDataCountries$ = this.countryService.getCountries();
  }

}
