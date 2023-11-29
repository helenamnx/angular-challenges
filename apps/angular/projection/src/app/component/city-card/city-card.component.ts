import { Component, OnInit } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CitiesStore } from '../../data-access/city.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { City } from '../../model/city.model';
@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  styleUrls: ['./city-card.component.css'],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent, NgFor],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;
  constructor(
    private http: FakeHttpService,
    private store: CitiesStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => (this.cities = s));
  }
}
