import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  private dataUrl : string = "app/mock/data.json";

  constructor(private http: Http) { }
  
  getProduct() {
    return this.http.get(this.dataUrl)
      .map(response => response.json().products );
  }
}