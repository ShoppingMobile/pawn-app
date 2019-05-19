import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './app/index/index.component';

import { UserDashboardComponent} from './app/index/user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './app/index/user-details/user-details.component';
import { ParticularDashboardComponent } from './app/index/particular-dashboard/particular-dashboard.component';


const routes:Routes=[
    {path:"index", component:IndexComponent, children:[
        {path:'user-dashbaord', component: UserDashboardComponent},
        {path:'particular-dashbaord', component: ParticularDashboardComponent},
        {path:'user-details/:id/:name' ,component: UserDetailsComponent},
        {path:"", redirectTo: 'user-dashbaord', pathMatch: 'full'},
    ]},
    {path:"", redirectTo: '/index/user-dashbaord', pathMatch: 'full'},
]


@NgModule({
    exports: [RouterModule],
    imports:[RouterModule.forRoot(routes, { useHash: true })]
  })
  export class AppRoutingModule { }

