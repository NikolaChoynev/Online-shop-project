import { IBase } from './base';
import { IUser } from './user';
import { IProduct } from './product';

export interface IComment extends IBase {
   text: string;
   likes: IUser[];
   ownerId: IUser;
   productId: IProduct;
}

