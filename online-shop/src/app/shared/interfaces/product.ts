import { IBase } from './base';
import { IComment } from './comment';
import { IUser } from './user';

export interface IProduct extends IBase {
    productName: string;
    description: string;
    price: number;
    imageUrl: string;
    buyers: IUser[];
    ownerId: IUser;
    comments: IComment[];
}
