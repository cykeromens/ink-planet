import { Moment } from 'moment';

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
    imageContentType?: string;
    image?: any;
    modifiedDate?: Moment;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public quantity?: number,
        public price?: number,
        public imageContentType?: string,
        public image?: any,
        public modifiedDate?: Moment
    ) {}
}
