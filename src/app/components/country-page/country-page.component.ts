import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Observable} from "rxjs";

import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {CountryInterface} from "../../interfaces/country.interface";


@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit {
  country$: Observable<CountryInterface | undefined> | undefined;

  constructor(private countryService: CountriesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.country$ = this.route.params
      .pipe(
        switchMap((params: Params): Observable<CountryInterface | undefined> => {
            return this.countryService.getCountry(params['emoji']);
          }
        )
      )
  }


}
