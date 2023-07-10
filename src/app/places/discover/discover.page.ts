import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { InfiniteScrollCustomEvent, SegmentChangeEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places!: Place[];
  loadedPlaces: Place[] = [];
  index: number = 0;
  increasedAmount: number = 12;

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.loadPlaces();
  }

  private loadPlaces() {
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

  onFilterUpdate(ev: any) {

  }
}
