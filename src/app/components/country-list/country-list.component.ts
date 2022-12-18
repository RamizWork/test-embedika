import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Observable} from "rxjs";
import {CountryInterface} from "../../interfaces/country.interface";
import {DataCountriesInterface} from "../../interfaces/dataCountries.interface";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  loadCountriesFromApi$: Observable<CountryInterface[]> | undefined;
  countriesData$: Observable<DataCountriesInterface> | undefined;
  countryFilterData = {
    key: undefined,
    searchValue: ''
  }

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.loadCountriesFromApi$ = this.countryService.loadCountriesFromApi();
    this.countriesData$ = this.countryService.getCountriesData();
  }

  previousPage() {
    this.countryService.previousPage()
  }

  nextPage() {
    this.countryService.nextPage();
  }

  setFormValue(event: any) {
    this.countryFilterData.searchValue = event.name;
    this.countryFilterData.key = event.searchField;
  }
}
