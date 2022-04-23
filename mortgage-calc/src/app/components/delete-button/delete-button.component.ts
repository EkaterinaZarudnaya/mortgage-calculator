import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {

  @Input() getBanksId !: number;

  public id : any;

  constructor(public http: HttpClient) {
  }

  url: string = 'http://localhost:8000/api/banks/'

  rmBank() {
    return this.http.delete(this.url + this.getBanksId).subscribe((res) => {
      console.log('deleted bank'+ this.getBanksId);
      location.reload();
    });
  }

}
