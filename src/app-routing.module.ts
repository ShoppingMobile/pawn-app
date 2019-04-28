import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './app/index/index.component';

import { UserDashboardComponent} from './app/index/user-dashboard/user-dashboard.component'
import { UserDetailsComponent } from './app/index/user-details/user-details.component';

const routes:Routes=[
    {path:"index", component:IndexComponent, children:[
        {path:"",component:UserDashboardComponent},
        {path:'user-dashbaord', component: UserDashboardComponent},
        {path:'user-details/:id/:name' ,component: UserDetailsComponent}
        
    ]},
    {path:"", redirectTo: '/index', pathMatch: 'full'},
]


@NgModule({
    exports: [RouterModule],
    imports:[RouterModule.forRoot(routes)]
  })
  export class AppRoutingModule { }

