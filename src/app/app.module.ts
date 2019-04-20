import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { AppRoutingModule} from '../app-routing.module';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './index/user/user.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { UserDashboardComponent } from './index/user-dashboard/user-dashboard.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UserComponent,
    SideNavComponent,
    UserDashboardComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
