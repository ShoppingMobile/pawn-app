import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { AppRoutingModule} from '../app-routing.module';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { UserDashboardComponent, AddUserDialog } from './index/user-dashboard/user-dashboard.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { UserDetailsComponent, AddParticularDialog } from './index/user-details/user-details.component';
import { AddParticularComponent } from './index/add-particular/add-particular.component';
import { ParticularDashboardComponent, AddParticularsDialog } from './index/particular-dashboard/particular-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SideNavComponent,
    UserDashboardComponent,
    SnackBarComponent,
    UserDetailsComponent,
    AddParticularComponent,
    AddParticularDialog,
    AddUserDialog,
    ParticularDashboardComponent,
    AddParticularsDialog
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
  bootstrap: [AppComponent],
  entryComponents: [AddParticularDialog, AddUserDialog, AddParticularsDialog]
})
export class AppModule { }
