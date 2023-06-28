import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place!: Place;

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }
      this.place = this.placesService.getPlace(String(paramMap.get('placeId'))) as Place;
      if (!this.place) {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }
    });
  }

  onBookPlace() {
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place}
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      if(resultData.role) console.log('BOOKED!');
    });
  }
}
