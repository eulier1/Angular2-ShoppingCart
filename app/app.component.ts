import { Component } from '@angular/core';

import { ProductService } from './services/product.service';

import { Categories } from './models/categories.model';
import { Product } from './models/product.model';
import { Cart } from './models/cart.model';

@Component({
  selector: 'my-app',
  providers: [ProductService],
  templateUrl: 'app/home.html',
  styleUrls: ['app/home.css']
})

export class AppComponent  { 
  
  private displayDOM : string;

  public vm : any;
  public categories : Categories[] ;
  public products : Product[] ;
  public numProduct : number;
  public searchFriend: string;
  public cartDetail : Cart[] ;
 

  constructor(private productService: ProductService){  
    this.displayDOM = "home";
    this.categories = [];
    this.products = [];
    this.numProduct = 0;
    this.cartDetail = [];
    this.searchFriend = "";
    this.vm = []
  }

  ngOnInit(): void {

    this.productService.getProduct()      
        .subscribe(
        products => this.vm.products = products,
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
    );

  }

  public initializeProducts(){
    this.products = [];
    for (let i = 0; i < this.vm.products.length ; i++) {
      this.products.push({
          id: this.vm.products[i].id,
          name: this.vm.products[i].name,
          price: this.vm.products[i].price, 
          available: this.vm.products[i].available,
          best_seller: this.vm.products[i].best_seller,
          categories: this.vm.products[i].categories,
          img : this.vm.products[i].img,
          description : this.vm.products[i].description
      });
    }
  }

  public initializeCategories(){
     this.categories = [];
     for (var i = 0; i < this.vm.categories.length; i++) {
       this.categories.push({
         categori_id: this.vm.categories[i].categori_id ,
         name: this.vm.categories[i].name
       })
     }
  }

  public showProduct(){
    console.log("showProduct, home.component");
    this.displayDOM = "product";
    this.cheapest();
  }

  public showHome(){
    console.log("showHome, home.component");
    this.displayDOM = "home";
  }

  public showShoppingCart(){
    this.displayDOM = "shoppingcart";
  }

  public toproduct(){
    this.initializeProducts();
    this.initializeCategories();
    //console.log(this.vm);
    //console.log(this.products);
    //console.log(this.categories);
  }

  // Shopping Cart
  public addCart( i : number, item : [Product] ){

    this.cartDetail.push({
      idChart : i,
      product : item ,
      quantity : 1,
    })

  }

  public removeCart( i : number, item : Product){
    
    for (var j = 0; j < this.cartDetail.length; j++) {
      if( this.cartDetail[j].idChart == i ){
        this.cartDetail.splice(j,1)
        break         
      }
    }

  }

  public clearCart(){
    this.cartDetail = []; 
  }

  // Filters
  public getByName(ev: any) {

    this.initializeProducts();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.products = this.vm.products.filter((item : any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  public showCategories(option : string){
    this.initializeProducts();
    let len = this.products.length;
    let result : Product[] = [];
    let j = 0;

    if(option == "1"){
      for (var i = 0; i < len; i++) {
        for (var k = 0; k < this.products[i].categories.length ; k++) {
          if( this.products[i].categories[k] == 1 ){
            result[j] = this.products[i];
            j++;          
          } 
        }
      }
      this.products = [];
      this.products = result;
    }
    if(option == "2"){
      for (var i = 0; i < len; i++) {
        for (var k = 0; k < this.products[i].categories.length ; k++) {
          if( this.products[i].categories[k] == 2 ){
            console.log(this.products[i])
            result[j] = this.products[i];
            j++;          
          } 
        }
      }
      this.products = [];
      this.products = result;      
    }
    if(option == "3"){
      for (var i = 0; i < len; i++) {
        for (var k = 0; k < this.products[i].categories.length ; k++) {
          if( this.products[i].categories[k] == 3 ){
            console.log(this.products[i])
            result[j] = this.products[i];
            j++;          
          } 
        }
      }
      this.products = [];
      this.products = result;       
    }
    if(option == "4"){
      for (var i = 0; i < len; i++) {
        for (var k = 0; k < this.products[i].categories.length ; k++) {
          if( this.products[i].categories[k] == 4 ){
            console.log(this.products[i])
            result[j] = this.products[i];
            j++;          
          } 
        }
      }
      this.products = [];
      this.products = result; 
    }
  }

  public showProducts(option : string){
    this.initializeProducts();
    let len = this.products.length;
    let result : Product[] = [];
    let j = 0;

    if(option == "1"){
      for (var i = 0; i < len; i++) {
          if( this.products[i].available ){
            result[j] = this.products[i];
            j++;          
          }   
      }
      this.products = [];
      this.products = result
    }
    if(option == "2"){
      for (var i = 0; i < len; i++) {
          if( !this.products[i].available ){
            result[j] = this.products[i];
            j++;          
          }   
      }
      this.products = [];
      this.products = result
    }
    if(option == "3"){
      for (var i = 0; i < len; i++) {
          if( this.products[i].best_seller ){
            result[j] = this.products[i];
            j++;          
          }   
      }
      this.products = [];
      this.products = result
    }

  }

  public showPrice(option : string){
    this.initializeProducts();
    let len = this.products.length;
    let result : Product[] = [];
    let j = 0;

    if(option == "1"){
      for (var i = 0; i < len; i++) {
          if( 30.000 <  parseInt(this.products[i].price) ){
            result[j] = this.products[i];
            j++;          
          }   
      }
      this.products = [];
      this.products = result
    }
    if(option == "2"){
      for (var i = 0; i < len; i++) {
          if( 10.000 >  parseInt(this.products[i].price) ){
            result[j] = this.products[i];
            j++;          
          }   
      }
      this.products = [];
      this.products = result
    }
  }

  public orderAZ(){
    this.initializeProducts();

    let mapped = this.products.map((el, i) => {
      return { index: i, value: el };
    })

    mapped.sort((a, b) => {
      return +(a.value.name.toLowerCase() > b.value.name.toLowerCase()) ||
        +(a.value.name.toLowerCase() === b.value.name.toLowerCase()) - 1;
    });

    let result = mapped.map((el) => {
      return this.products[el.index];
    });

    this.products = result;
  }

  public expensive(){   
    this.initializeProducts();

    let mapped = this.products.map((el, i) => {
      return { index: i, value: el };
    })

    mapped.sort((a, b) => {
      return +(parseInt(a.value.price.toLowerCase())  < parseInt(b.value.price.toLowerCase())) ||
        +(parseInt(a.value.price.toLowerCase()) === parseInt(b.value.price.toLowerCase())) - 1;
    });

    let result = mapped.map((el) => {
      return this.products[el.index];
    });

    this.products = result;
  }

  public cheapest(){
    this.initializeProducts();

    let mapped = this.products.map((el, i) => {
      return { index: i, value: el };
    })

    mapped.sort((a, b) => {
      return +(parseInt(a.value.price.toLowerCase())  > parseInt(b.value.price.toLowerCase())) ||
        +(parseInt(a.value.price.toLowerCase()) === parseInt(b.value.price.toLowerCase())) - 1;
    });

    let result = mapped.map((el) => {
      return this.products[el.index];
    });

    this.products = result;
  }

  

  
}
