import { Component } from '@angular/core';

interface Banks {
  name: string;
  id: number;
  rate: number;
  maxloan: number;
  minpay: number;
  term: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  public banksData: Banks[] = [];
  displayedColumns = ['id', 'name', 'rate','maxloan','minpay','term','delButton'];

  getBanksData(newItem: any = []) {
    this.banksData = newItem;
  }

}
