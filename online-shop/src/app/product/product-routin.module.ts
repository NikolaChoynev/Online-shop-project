import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
    {
        path: 'product',
        children: [
            {
                path: 'new',
                component: NewProductComponent
            },
            {
                path: 'detail/:id',
                component: DetailComponent
            }
        ]
    }
];

export const ProductRouterModule = RouterModule.forChild(routes);
