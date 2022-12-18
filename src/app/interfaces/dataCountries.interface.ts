import {CountryInterface} from "./country.interface";
import {PaginationInterface} from "./pagination.interface";

export interface DataCountriesInterface {
  countries: CountryInterface[];
  pagination: PaginationInterface;
}
