import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Viaje } from 'src/app/services/viaje';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  viaje: number;
  arrayViaje: Viaje[];

  @ViewChild(IonModal) modal: IonModal;
  num: number = 4700;

  constructor(private toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private wayplaceDB: SqliteService) { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this, 'confirm');
  }

  ngOnInit() {
    this.wayplaceDB.dbState().subscribe(res => {
      if (res) {
        this.wayplaceDB.fetchViajes().subscribe(item => {
          this.arrayViaje = item;
        })
      }
    })
  }

}
