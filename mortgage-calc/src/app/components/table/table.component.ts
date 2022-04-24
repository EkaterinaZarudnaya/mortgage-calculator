import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { pluck } from 'rxjs';

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

  ngOnInit() {
    this.getBanksDb();
  }

  constructor (private http: HttpClient) { }

  getBanksDb(){
    const url = 'http://localhost:8000/api/banks'
    this.http.get(url).pipe(pluck('data')).subscribe((res) => {
      this.banksData = res as Banks[]
      console.log(res);
    });

  }

}
