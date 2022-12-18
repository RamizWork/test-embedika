import {Injectable} from "@angular/core";
import {Apollo, gql} from "apollo-angular";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";
import {CountryInterface} from "../interfaces/country.interface";
import {CountryKeysEnum} from "../enum/country-keys.enum";

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

  dataCountries$: BehaviorSubject<CountryInterface[]> = new BehaviorSubject<CountryInterface[]>([]);

  constructor(private apollo: Apollo) {
  }

  getCountries(): Observable<CountryInterface[]> {
    return this.apollo
      .watchQuery<any>({
        query: COUNTRIES,
      })
      .valueChanges
      .pipe(
        map((result) => result.data.countries),
        tap(value => this.dataCountries$.next(value))
      );
  }

  getCountry(emoji: string): Observable<CountryInterface | undefined> {
    const dataCountries = this.dataCountries$.getValue();

    if (dataCountries.length) {
      const findCountry = this.findCountry(dataCountries, CountryKeysEnum.emoji, emoji);

      return of(findCountry);
    }

    return this.getCountries().pipe(
      map((countries) => {
        return this.findCountry(countries, CountryKeysEnum.emoji, emoji);
      })
    )
  }

  private findCountry(countries: CountryInterface[],
                      searchKey: CountryKeysEnum,
                      searchValue: string): CountryInterface | undefined {
    return countries.find((country) => {
      return country[searchKey] === searchValue;
    });
  }


}
