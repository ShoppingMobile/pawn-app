import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from './message.service';
import { Subscription } from 'rxjs/internal/Subscription';

export interface PeriodicElement {
  id: number,
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  phone: number;
}
export interface DialogData {
  userId: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
let config = new MatSnackBarConfig();
config.duration = 2000;


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'address1', 'address2', 'phone'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  firstNameFilter = new FormControl();
  address2Filter = new FormControl();
  globalFilter = '';
  filteredValues = {
    id: '', firstname: '', lastname: '', address1: '', address2: '', phone: ''
  };
  lastNameFilter = new FormControl();
  userSearchForm: FormGroup;
  searchQuery: any;
  subscription: Subscription;
  message: any = "doctor";
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private userService: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.getAllUser();
    this.userSearchForm = this.fb.group({
      searchQuery: ["", Validators.required]
    });

    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
      this.getAllUser();
    });

  }

  ngOnInit() {
    this.firstNameFilter.valueChanges.subscribe((firstNameFilterValue) => {
      this.filteredValues['firstname'] = firstNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.lastNameFilter.valueChanges.subscribe((lastNameFilterValue) => {
      this.filteredValues['lastname'] = lastNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.address2Filter.valueChanges.subscribe((address2FilterValue) => {
      this.filteredValues['address2'] = address2FilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: PeriodicElement, filter: string): boolean => {

      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        globalMatch = data.firstname.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.lastname.toString().trim().toLowerCase().indexOf(searchString.lastname.toLowerCase()) !== -1 &&
        data.firstname.toString().trim().toLowerCase().indexOf(searchString.firstname.toLowerCase()) !== -1 &&
        data.address2.toString().trim().toLowerCase().indexOf(searchString.address2.toLowerCase()) !== -1;
    }

    return myFilterPredicate;
  }

  get uSForm() {
    return this.userSearchForm.controls;
  }
  open() {
    this.snackBar.open("Hello", 'Retry', config)
  }
  addUserDetails(): void {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '500px',
      height: '520px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res.result);
     //   this.snackBar.open("User details added successfully", 'Close', config)
      }, (error) => {
        this.snackBar.open("Something went wrong, Please try again.", '', config)
      })
  }
}


@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user.component.html',
})
export class AddUserDialog implements OnInit {
  particularForm: FormGroup;
  statusDetails: any = ['pending', 'closed'];
  userForm: FormGroup;
  firstName: any;
  lastName: any;
  districtList = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharampuri", "Dindigul", "Erode", "Kancheepuram", "Kanniyakumarai", "Karur", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Niligiris", "Theni", "Thiruvallur", "Thiruvarur", "Tiruchchirapalli", "Tirunelveli", "Tiruvannamalai", "Thoothukudi", "Vellore", "Villupuram", "Virudhnagar"];

  userSearchForm: FormGroup;
  searchQuery: any;
  isUserLoggedIn: boolean;

  constructor(
    private messageService: MessageService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      address1: ["", Validators.required],
      address2: ["", Validators.required],
      district: ["", Validators.required],
      state: ["", Validators.required],
      contactnumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
    })

    this.userSearchForm = this.fb.group({
      searchQuery: ["", Validators.required]
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.userService.addUserDetails(this.userForm.value).subscribe((res: any) => {
      res.status ? document.getElementById("reset").click() : "";
      this.snackBar.open("User details added successfully", 'Close', config)
      this.messageService.isUserLoggedIn()

      this.onNoClick();
    })
  }
  get uForm() {
    return this.userForm.controls;
  }

}


