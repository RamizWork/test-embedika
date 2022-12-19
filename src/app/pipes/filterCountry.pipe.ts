import {Pipe, PipeTransform} from "@angular/core";

import {CountryInterface} from "../interfaces/country.interface";
import {CountryKeysEnum} from "../enum/country-keys.enum";

@Pipe({name: 'filterCountry'})
export class FilterCountryPipe implements PipeTransform {
  transform(value: CountryInterface[], searchKey: CountryKeysEnum | undefined, searchValue = ''): CountryInterface[] {
    if (searchKey && searchValue.length) {
      return value.filter((country) => {
        return country[searchKey].trim().toLowerCase().includes(searchValue.trim().toLowerCase());
      })
    }

    return value;
  }
}
