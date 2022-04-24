import { Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from '@angular/forms';
import { min, pluck } from 'rxjs';
import { __values } from 'tslib';

interface BanksList {
  id: number;
  name: string;
}


@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})

export class CalcComponent implements OnInit{

  constructor (private http: HttpClient) { }

  public banks: BanksList[] = [];
  public banksDataValue: any;

  public loan!: number;
  public bankid!: number;

  isShown: boolean = false ;
  selectedBank!: any;

  public monthPay!:number;
  public firstPay!:number;

  public result!: string;


  setUsersData(userloan: NgForm, userbankid: NgForm) {
    this.loan=userloan as unknown as number;
    this.bankid=userbankid as unknown as number;

    [this.monthPay, this.firstPay] = this.getBanksValueCalc();

    console.log(this.monthPay);
    console.log(this.firstPay);

    this.resultShowdiv()
  }

  ngOnInit() {
    this.getBanksListDb();
    this.monthPay=0
    this.firstPay=0
  }

  getBanksListDb(){
    const url = 'http://localhost:8000/api/banks/names'
    this.http.get(url).pipe(pluck('data')).subscribe((res) => {
      this.banks = res as BanksList[]
    });
  }

  getBanksValueCalc(){
    const url = 'http://localhost:8000/api/banks/'
    this.http.get(url+ this.bankid).pipe(pluck('data')).subscribe((res) => {
    this.banksDataValue = res;
    if(this.loan<=this.banksDataValue.maxloan){

      this.monthPay=(this.loan*(this.banksDataValue.rate as number/1200)*Math.pow((1+(this.banksDataValue.rate as number/1200)),this.banksDataValue.term as number*12))/(Math.pow((1+(this.banksDataValue.rate as number/1200)),this.banksDataValue.term as number*12)-1);
      this.firstPay=this.loan*(this.banksDataValue.minpay/100);

    }
    });
    return [this.monthPay, this.firstPay]
  }

  resultShowdiv() {
    if(this.isShown==false)
    this.isShown = ! this.isShown;
    this.result = '<p>Down payment - '+this.firstPay+'</p> <p>Monthly mortgage payment - '+this.monthPay+'</p>';
  }

}
