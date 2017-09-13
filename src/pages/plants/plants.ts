import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlantsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plants',
  templateUrl: 'plants.html',
})
export class PlantsPage {

  stageType = 'All';

  stages: any = {
    'Clone': [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0002',
        itemName: 'Monopoly',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ],
    'Vegetation': [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ],
    'Flower': [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0002',
        itemName: 'Monopoly 2',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ],
    'Harvest': [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0002',
        itemName: 'Monopoly 2',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ],
    'Dry': [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0002',
        itemName: 'Monopoly 2',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ],
    'Cure': [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0002',
        itemName: 'Monopoly 2',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ],
    'Developed': [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0002',
        itemName: 'Monopoly 2',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ],
    'Destroyed': [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0002',
        itemName: 'Monopoly 2',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ]
  };

  getItems(type: any) {
    return this.stages[type];
  }

  id: any;

  showDetail(show: any) {
    return this.id = show;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantsPage');
  }

}
