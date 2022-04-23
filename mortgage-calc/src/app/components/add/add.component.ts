import { Component, NgModule, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent{

  constructor (private http: HttpClient) { }

  url: string = 'http://localhost:8000/api/banks'

  getBanksData(data: NgForm) {  
    console.log(data);
  }

  submitBanksData(data: NgForm){
    return this.http.post(this.url, data).subscribe((res) => {
      console.log(res);
      location.reload();
    });
  }

}
