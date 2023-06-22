import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place!: Place;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {

  }

  onBookPlace() {
    this.navCtrl.navigateBack('places/discover');
  }
}
