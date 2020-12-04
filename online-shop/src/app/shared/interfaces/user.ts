import { IBase } from './base';
import { IComment } from './comment';
import { IProduct } from './product';

export interface IUser extends IBase {
    address: string;
    email: string;
    username: string;
    password: string;
    products: IProduct[];
    bought: IProduct[];
    comments: IComment[];
}
