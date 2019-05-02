import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Particulars } from '../../types/particular.type';
import { UserService } from '../../services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface DialogData {
  userId: number;
}

export interface StateGroup {
  id: number;
  firstname: string;
  address2: string;
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};


const particularData: Particulars[] = [];


@Component({
  selector: 'app-particular-dashboard',
  templateUrl: './particular-dashboard.component.html',
  styleUrls: ['./particular-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ParticularDashboardComponent implements OnInit {

  particulars: any;
  displayedColumns: string[] = ['particular_name', 'amount', 'firstname', 'address2', 'status', 'date', 'option'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userDetails: any;
  dataSource = new MatTableDataSource(particularData);
  statusDetails: any = ['pending', 'closed'];
  selectedParticularId: number;
  editParticular: FormGroup;
  allParticularUser: any;
  userId: any;
  userName: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.userId = +this.route.snapshot.params.id;
    this.userName = this.route.snapshot.params.name;

    this.getAllUserParticulars();
    
    this.userService.getUser(this.userId).subscribe((res: any) => {
      this.userDetails = res.result[0];
    });

    this.editParticular = this.fb.group({
      particular_name: ["", Validators.required],
      amount: ["", Validators.required],
      status: ["", Validators.required],
      date: ["", Validators.required]
    });
  }

  getAllUserParticulars() {
    this.userService.getAllParticularAllUser().subscribe((res: any) => {
      this.dataSource.data = res.result;
      this.allParticularUser = res.result;
    });
  }

  optionParticular(...arg) {  // (id, option) Parameters
  let singleParticular:any;
  this.userService.getSingleParticular(arg[0]).subscribe((res:any) =>{
    singleParticular= res.result[0];
    
    this.editParticular.patchValue({
      particular_name: singleParticular.particular_name,
      status: singleParticular.status,
      amount: singleParticular.amount,
      date: singleParticular.date
    });
  });    
  this.selectedParticularId = arg[1] == 'edit' ? arg[0] : 0;

  }

  isVisible(id) {
    return this.selectedParticularId === id;
  }

  editParticulars() {
    this.userService.editParticular(this.editParticular.value, this.selectedParticularId, this.userId).subscribe((res: any) => {
      this.getAllUserParticulars();
      this.selectedParticularId = 0;
    });
  }

  addParticularsDetails(): void {
    const dialogRef = this.dialog.open(AddParticularsDialog, {
      width: '400px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}





@Component({
  selector: 'add-particulars-dialog',
  templateUrl: 'add-particular.component.html',
})
export class AddParticularsDialog implements OnInit {
  particularForm: FormGroup;
  statusDetails: any = ['pending', 'closed'];
  myControl = new FormControl();

  options: StateGroup[] = [


  ];

  filteredOptions: Observable<StateGroup[]>;

  constructor(
    private fb: FormBuilder,
    private particularService: UserService,
    public dialogRef: MatDialogRef<AddParticularsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {

    this.particularForm = this.fb.group({
      particular_name: ["", Validators.required],
      amount: ["", Validators.required],
      status: ["", Validators.required],
      particular_id: ["", []],
      date: ["", []],
      user_id: ["", []]
    });

    this.particularService.searchUserId().subscribe((res:any)=>{
      this.options=res.result;
    });
    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | StateGroup>(''),
        map(value => typeof value === 'string' ? value : value.firstname),
        map(firstname => firstname ? this._filterGroup(firstname) : this.options.slice())
      );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addParticular() {
    this.particularForm.patchValue({
      particular_id: (1 + (Math.random()) * 0x10000000) | 0,
      date: new Date(),
      user_id: this.myControl.value.id
    });
    this.particularService.addParticularDetails(this.particularForm.value).subscribe((res: any) => {
      this.onNoClick();
    });
  }

  private _filterGroup(value: string): StateGroup[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstname.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(user?: StateGroup): string | undefined {
    return user ? user.firstname : undefined;
  }
}