import {Component, Output, EventEmitter} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
  selector: 'app-get-button',
  templateUrl: './get-button.component.html',
  styleUrls: ['./get-button.component.css']
})

export class GetButtonComponent {

  @Output() allBanksData = new EventEmitter();
  public banks: Banks[] = [];


  constructor(public http: HttpClient) {
  }

  getData() {
    const url = 'http://localhost:8000/api/banks'
    this.http.get(url).pipe(pluck('data')).subscribe((res) => {
      this.banks = res as Banks[]
      this.allBanksData.emit(this.banks)
      console.log(res);
    });
  }
}
