import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './app/index/index.component';
import { UserComponent } from './app/index/user/user.component';
import { UserDashboardComponent} from './app/index/user-dashboard/user-dashboard.component'

const routes:Routes=[
    {path:"index", component:IndexComponent, children:[
        {path:"",component:UserComponent},
        {path:"user", component:UserComponent},
        {path:'user-dashbaord',component: UserDashboardComponent},
        
    ]},
    {path:"", redirectTo: '/index', pathMatch: 'full'},
]


@NgModule({
    exports: [RouterModule],
    imports:[RouterModule.forRoot(routes)]
  })
  export class AppRoutingModule { }

