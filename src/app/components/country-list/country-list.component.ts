import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Observable} from "rxjs";
import {CountryInterface} from "../../interfaces/country.interface";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countryData$: Observable<CountryInterface[]> | undefined;

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.countryData$ = this.countryService.getCountries();
  }

}
