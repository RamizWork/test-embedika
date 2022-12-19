import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {debounceTime, tap} from "rxjs/operators";

import {CountryKeysEnum} from "../../enum/country-keys.enum";


@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.scss']
})
export class CountryFilterComponent implements OnInit {

  @Output() formValue = new EventEmitter();
  form: FormGroup | any;
  countryKeys = CountryKeysEnum;
  watcherForm$: Observable<any> | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.initialize();
    this.watcherForm$ = this.form.valueChanges.pipe(
      debounceTime(500),
      tap(value => {
        this.formValue.emit(value);
      })
    )
  }

  initialize() {
    this.form = new FormGroup({
      name: new FormControl(''),
      searchField: new FormControl(this.countryKeys.phone)
    });
  }
}
