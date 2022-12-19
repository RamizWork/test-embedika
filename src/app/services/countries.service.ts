import {Injectable} from "@angular/core";
import {Apollo, gql} from "apollo-angular";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";

import {CountryInterface} from "../interfaces/country.interface";
import {CountryKeysEnum} from "../enum/country-keys.enum";
import {DataCountriesInterface} from "../interfaces/dataCountries.interface";

const COUNTRIES = gql`{
countries {
      name
      capital
      currency
      emoji
      phone
      continent {
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  dataCountries$: BehaviorSubject<DataCountriesInterface> = new BehaviorSubject<DataCountriesInterface>({
    countries: [],
    pagination: {
      total_pages: 0,
      current_page: 1
    }
  });
  dataSource$: BehaviorSubject<CountryInterface[]> = new BehaviorSubject<CountryInterface[]>([]);

  constructor(private apollo: Apollo) {
  }

  loadCountriesFromApi(): Observable<CountryInterface[]> {
    return this.apollo
      .watchQuery<any>({
        query: COUNTRIES,
      })
      .valueChanges
      .pipe(
        map((result) => result.data.countries),
        tap(value => {
          this.dataSource$.next(value);
          this.initialCountriesData(value);
        })
      );
  }

  getCountry(emoji: string): Observable<CountryInterface | undefined> {
    const dataCountries = this.dataSource$.getValue();

    if (dataCountries.length) {
      const findCountry = this.findCountry(dataCountries, CountryKeysEnum.emoji, emoji);

      return of(findCountry);
    }

    return this.loadCountriesFromApi().pipe(
      map((countries) => {
        return this.findCountry(countries, CountryKeysEnum.emoji, emoji);
      })
    )
  }

  getCountriesData(): Observable<DataCountriesInterface> {
    return this.dataCountries$.asObservable();
  }

  nextPage(): void {
    const dataCountries = this.dataCountries$.getValue();

    if (dataCountries.pagination.total_pages > dataCountries.pagination.current_page) {
      const lastCurrentCountry = dataCountries.countries[dataCountries.countries.length - 1];
      const dataSource = this.dataSource$.getValue();
      const lastCurrentIndexInDataSource = dataSource.indexOf(lastCurrentCountry);
      const countries = dataSource.slice(lastCurrentIndexInDataSource + 1, lastCurrentIndexInDataSource + 6);
      const newDataCountries: DataCountriesInterface = {
        countries,
        pagination: {
          current_page: dataCountries.pagination.current_page + 1,
          total_pages: dataCountries.pagination.total_pages
        }
      }
      this.dataCountries$.next(newDataCountries);
    }
  }

  previousPage(): void {
    const dataCountries = this.dataCountries$.getValue();

    if (dataCountries.pagination.current_page > 1) {
      const lastCurrentCountry = dataCountries.countries[dataCountries.countries.length - 1];
      const dataSource = this.dataSource$.getValue();
      const lastCurrentIndexDataSource = dataSource.indexOf(lastCurrentCountry);
      const countries = dataSource.slice(lastCurrentIndexDataSource - 9, lastCurrentIndexDataSource - 4);
      const newDataCountries: DataCountriesInterface = {
        countries,
        pagination: {
          current_page: dataCountries.pagination.current_page - 1,
          total_pages: dataCountries.pagination.total_pages
        }
      }
      this.dataCountries$.next(newDataCountries);
    }
  }

  private findCountry(countries: CountryInterface[],
                      searchKey: CountryKeysEnum,
                      searchValue: string): CountryInterface | undefined {
    return countries.find((country) => {
      return country[searchKey] === searchValue;
    });
  }

  private initialCountriesData(countriesFromApi: CountryInterface[]) {
    const totalPages = countriesFromApi.length / 5;
    const countries = countriesFromApi.slice(0, 5);
    this.dataCountries$.next({
      countries: countries,
      pagination: {
        total_pages: totalPages,
        current_page: 1
      }
    })
  }
}
