import {Component, Input, OnInit} from '@angular/core';

import {CountryInterface} from "../../interfaces/country.interface";

@Component({
  selector: 'app-country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.scss']
})
export class CountryPreviewComponent implements OnInit {
  @Input() country: CountryInterface | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
