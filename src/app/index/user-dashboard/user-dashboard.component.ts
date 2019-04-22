import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UserService } from 'src/app/services/user.service';

export interface PeriodicElement {
  id: number,
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  phone: number;
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
   globalFilter = '';
  filteredValues = {
    id: '', firstname: '', lastname: '', address1: '', address2: '', phone: ''
  };
  lastNameFilter = new FormControl();
  userSearchForm: FormGroup;
  searchQuery: any;



  constructor(private fb: FormBuilder, private userService: UserService, public snackBar: MatSnackBar) {
    this.userService.getAllUser().subscribe(
      (res: any) => {

        this.dataSource = new MatTableDataSource(res.result);
        this.snackBar.open("User details added successfully", 'Close', config)

      }, (error) => {
        this.snackBar.open("Something went wrong, Please try again.", '', config)
      })


    this.userSearchForm = this.fb.group({
      searchQuery: ["", Validators.required]
    })



  }

  ngOnInit() {  
    // this.firstNameFilter.valueChanges.subscribe((firstNameFilterValue) => {
    //   this.filteredValues['firstname'] = firstNameFilterValue;
    //   this.dataSource.filter = JSON.stringify(this.filteredValues);
    //   this.dataSource.filterPredicate = this.customFilterPredicate();
    // });

    // this.lastNameFilter.valueChanges.subscribe((lastNameFilterValue) => {
    //   this.filteredValues['lastname'] = lastNameFilterValue;
    //   this.dataSource.filter = JSON.stringify(this.filteredValues);
    //   this.dataSource.filterPredicate = this.customFilterPredicate();
    // });

    // this.dataSource.filterPredicate = this.customFilterPredicate();




  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  customFilterPredicate() {
    debugger;
    const myFilterPredicate = (data: PeriodicElement, filter: string): boolean => {
      debugger;
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.firstname.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.lastname.toString().trim().toLowerCase().indexOf(searchString.lastname.toLowerCase()) !== -1 &&
        data.firstname.toString().trim().toLowerCase().indexOf(searchString.firstname.toLowerCase()) !== -1;
    }

    return myFilterPredicate;
  }

  get uSForm() {
    return this.userSearchForm.controls;
  }
  open() {

    this.snackBar.open("Hello", 'Retry', config)
  }

}





// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
// import { MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarConfig} from '@angular/material';
// import { UserService } from 'src/app/services/user.service';

// export interface PeriodicElement {
//   id:number,
//   firstname: string;
//   lastname: string;
//   address1: string;
//   address2: string;
//   phone: number;
//   district: string;
//   state:string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [{"id":76454,"firstname":"Muthu","lastname":"Kamalakannan","address1":"mailformuthu07@gmail.com","address2":"Panapakkam","district":"Villupuram","state":"Tamilnadu","phone":9884500746},{"id":1000001,"firstname":"Subash","lastname":"Kesavan","address1":"No 1/39, Mariyamman koil street\r\nPanapakkam (Mel),","address2":"Panapakkam (Mel)","district":"Villupuram","state":"Tamilnadu","phone":9884500382},{"id":1000002,"firstname":"Subash","lastname":"Kumar","address1":"No 1/39, Mariyamman koil street\r\nPanapakkam (Mel),","address2":"Panapakkam (Mel),","district":"Villupuram","state":"Tamilnadu","phone":9597652172}, {"id":76454,"firstname":"Muthu","lastname":"Kamalakannan","address1":"mailformuthu07@gmail.com","address2":"Panapakkam","district":"Villupuram","state":"Tamilnadu","phone":9884500746},{"id":1000001,"firstname":"Subash","lastname":"Kesavan","address1":"No 1/39, Mariyamman koil street\r\nPanapakkam (Mel),","address2":"Panapakkam (Mel)","district":"Villupuram","state":"Tamilnadu","phone":9884500382},{"id":1000002,"firstname":"Subash","lastname":"Kumar","address1":"No 1/39, Mariyamman koil street\r\nPanapakkam (Mel),","address2":"Panapakkam (Mel),","district":"Villupuram","state":"Tamilnadu","phone":9597652172}, {"id":76454,"firstname":"Muthu","lastname":"Kamalakannan","address1":"mailformuthu07@gmail.com","address2":"Panapakkam","district":"Villupuram","state":"Tamilnadu","phone":9884500746},{"id":1000001,"firstname":"Subash","lastname":"Kesavan","address1":"No 1/39, Mariyamman koil street\r\nPanapakkam (Mel),","address2":"Panapakkam (Mel)","district":"Villupuram","state":"Tamilnadu","phone":9884500382},{"id":1000002,"firstname":"Subash","lastname":"Kumar","address1":"No 1/39, Mariyamman koil street\r\nPanapakkam (Mel),","address2":"Panapakkam (Mel),","district":"Villupuram","state":"Tamilnadu","phone":9597652172}, {"id":76454,"firstname":"Muthu","lastname":"Kamalakannan","address1":"mailformuthu07@gmail.com","address2":"Panapakkam","district":"Villupuram","state":"Tamilnadu","phone":9884500746},{"id":1000001,"firstname":"Subash","lastname":"Kesavan","address1":"No 1/39, Mariyamman koil street\r\nPanapakkam (Mel),","address2":"Panapakkam (Mel)","district":"Villupuram","state":"Tamilnadu","phone":9884500382},{"id":1000002,"firstname":"Subash","lastname":"Kumar","address1":"No 1/39, Mariyamman koil street\r\nPanapakkam (Mel),","address2":"Panapakkam (Mel),","district":"Villupuram","state":"Tamilnadu","phone":9597652172}];
// let config = new MatSnackBarConfig();
// config.duration=2000;


// @Component({
//   selector: 'app-user-dashboard',
//   templateUrl: './user-dashboard.component.html',
//   styleUrls: ['./user-dashboard.component.css']
// })
// export class UserDashboardComponent implements OnInit {

//   displayedColumns: string[] = ['id', 'firstname', 'lastname', 'address1','address2', 'phone','district','state'];
//   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
//   @ViewChild(MatPaginator) paginator: MatPaginator;

//   firstNameFilter = new FormControl();
//   globalFilter = '';
//   filteredValues = {
//     id: '', firstname: '', lastname: '', address1: '',address2:'', phone:'', district:'', state:''
//   };


//   //lastNameFilter = new FormControl();



//   userSearchForm : FormGroup;
//   searchQuery:any;



//   constructor(private fb:FormBuilder, private userService: UserService, public snackBar: MatSnackBar) { 

//     this.userSearchForm = this.fb.group({
//       searchQuery: ["", Validators.required]
//     })



//   }

//   ngOnInit() {
//     this.userService.getAllUser().subscribe(
//       (res:any)=>{

//      this.dataSource = new MatTableDataSource<PeriodicElement>(res.result);
//       this.snackBar.open("User details added successfully",'Close', config)

//       },(error)=>{
//         this.snackBar.open("Something went wrong, Please try again.",'', config)
//     })


//     this.firstNameFilter.valueChanges.subscribe((firstNameFilterValue) => {
//       this.filteredValues['firstname'] = firstNameFilterValue;
//       this.dataSource.filter = JSON.stringify(this.filteredValues);
//       this.dataSource.filterPredicate = this.customFilterPredicate();
//     });

//     // this.lastNameFilter.valueChanges.subscribe((lastNameFilterValue) => {
//     //   this.filteredValues['lastname'] = lastNameFilterValue;
//     //   this.dataSource.filter = JSON.stringify(this.filteredValues);      
//     //   this.dataSource.filterPredicate = this.customFilterPredicate();
//     // });

//    this.dataSource.filterPredicate = this.customFilterPredicate();




//   }

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }


//   applyFilter(filterValue: string) {

//     this.globalFilter = filterValue;
//     this.dataSource.filter = JSON.stringify(this.filteredValues);
//   }

//   customFilterPredicate() {
//     debugger;
//     const myFilterPredicate = (data: PeriodicElement, filter: string): boolean => {
//       debugger;
//       var globalMatch = !this.globalFilter;

//       if (this.globalFilter) {
//         // search all text fields
//         globalMatch = data.firstname.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
//       }

//       if (!globalMatch) {
//         return;
//       }

//       let searchString = JSON.parse(filter);
//       return data.lastname.toString().trim().toLowerCase().indexOf(searchString.lastname.toLowerCase()) !== -1 &&
//         data.firstname.toString().trim().toLowerCase().indexOf(searchString.firstname.toLowerCase()) !== -1;
//     }

//     return myFilterPredicate;
//   }

//   get uSForm() {
//     return this.userSearchForm.controls;
//   }
//   open(){

//     this.snackBar.open("Hello",'Retry',config)
//   }

// }



