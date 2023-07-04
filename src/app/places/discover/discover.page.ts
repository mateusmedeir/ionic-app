import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places!: Place[];
  loadedPlaces!: Place[];
  index: number = 1;
  increasedAmount: number = 10;

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.loadedPlaces = this.places.slice(this.index, this.increasedAmount + 1);
    this.index += this.loadedPlaces.length;
  }

  private loadPlaces() {
    console.log(this.index, this.index + this.increasedAmount);
    this.loadedPlaces.push(...this.places.slice(this.index, this.index + this.increasedAmount));
    this.index += this.increasedAmount + 1;
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      this.loadPlaces();
      (ev as InfiniteScrollCustomEvent).target.complete();
      if (this.loadedPlaces.length + 1 === this.places.length)
        (ev as InfiniteScrollCustomEvent).target.disabled = true;
    }, 500);
  }
}
