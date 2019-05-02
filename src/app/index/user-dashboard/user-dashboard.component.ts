import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs/internal/Subscription';

import { UserService } from 'src/app/services/user.service';
import { MessageService } from './message.service';
import { Users } from '../../types/user.type';

export interface DialogData {
  userId: number;
}

const usersData: Users[] = [];
let config = new MatSnackBarConfig();
config.duration = 2000;


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDashboardComponent implements OnInit {

  displayedColumns: string[] = ['firstname', 'lastname', 'address2', 'address1', 'phone', 'options'];
  dataSource = new MatTableDataSource(usersData);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedUserId: number;
  firstNameFilter = new FormControl();
  address2Filter = new FormControl();
  globalFilter = '';
  filteredValues = {
    id: '', firstname: '', lastname: '', address1: '', address2: '', phone: ''
  };
  lastNameFilter = new FormControl();
  userSearchForm: FormGroup;
  editUser: FormGroup;
  subscription: Subscription;
  message: any = "doctor";

  public pageSize:number = 10;
  public currentPage:number = 0;
  public totalSize:number = 0;



  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private userService: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.getAllUser();
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
      this.getAllUser();
    });
  }
  public handlePage(e: any) {
    this.pageSize= e.pageSize;
    console.log(e);

  }


  ngOnInit() {

    this.editUser = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      address2: ["", Validators.required],
      address1: ["", Validators.required],
      phone: ["", Validators.required]
    });


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
    this.dataSource.paginator = this.paginator;

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filter: string) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  customFilterPredicate() {
      const myFilterPredicate = (data: Users, filter: string): boolean => {
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
        this.dataSource.data = res.result;
        this.totalSize = res.result.length;
      }, (error) => {
        this.snackBar.open("Something went wrong, Please try again.", '', config)
      })
  }
  optionUser(...arg) {  // (id, option) Parameters
    let singleUser:any;
    this.userService.getUser(arg[0]).subscribe((res:any) =>{

      singleUser= res.result[0];
      this.editUser.patchValue({
        firstname: singleUser.firstname,
        lastname: singleUser.lastname,
        address2: singleUser.address2,
        address1: singleUser.address1,
        phone: singleUser.phone
      });
    });    
    this.selectedUserId = arg[1] == 'edit' ? arg[0] : 0;
    }
  
  isVisible(id) {
    return this.selectedUserId === id;
  }
  editUsers() {
    this.userService.editUser(this.editUser.value, this.selectedUserId).subscribe((res:any)=>{
      this.getAllUser();
      this.selectedUserId = 0;
    });
  }


  get uSForm() {
    return this.userSearchForm.controls;
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


