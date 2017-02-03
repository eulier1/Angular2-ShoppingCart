import {Product} from './product.model';

export interface Cart {
    idChart : number,
    product : Product[],
    quantity : number
}