import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Particular } from '../../types/particular.type';
import { UserService } from '../../services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface DialogData {
  userId: number;
}

const ELEMENT_DATA: Particular[] = [];

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit {
  particulars: any;
  displayedColumns: string[] = ['particular_name', 'amount', 'status', 'date', 'option'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userDetails: any;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  statusDetails: any = ['pending', 'closed'];
  selectedParticularId: number;
  editParticular: FormGroup;
  allParticularUser: any;
  animal: string;
  name: string;
  userId: any;
  userName:any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog) {
    console.log(4344)
  }

  ngOnInit() {
    this.userId = +this.route.snapshot.params.id;
    this.userName = this.route.snapshot.params.name;
    this.getAllParticulars();

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

  getAllParticulars(){
    this.userService.getAllParticularUser(this.userId).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.result);
      this.allParticularUser = res.result;
    });    
  }

  optionParticular(id, option) {
    let particular = this.allParticularUser.filter((val, i) => {
      return val.particular_id === id;
    });
    particular = particular[0];
    this.editParticular.patchValue({
      particular_name: particular.particular_name,
      status: particular.status,
      amount: particular.amount,
      date: particular.date
    });
    this.selectedParticularId = option == 'edit' ? id: 0;
  }

  isVisible(id) {
    return this.selectedParticularId === id;
  }

  editParticulars(data) {
    this.userService.editParticular(this.editParticular.value, this.selectedParticularId, this.userId).subscribe((res: any) => {
      this.getAllParticulars();
      this.selectedParticularId = 0;
    });
  }

  addParticular(userId,userName): void {
    console.log(userId, userName)
    const dialogRef = this.dialog.open(AddParticularDialog, {
      width: '400px',
      data: { userId: userId, userName:userName }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}

@Component({
  selector: 'add-particular-dialog',
  templateUrl: 'add-particular.component.html',
})
export class AddParticularDialog implements OnInit {
  particularForm: FormGroup;
  statusDetails: any = ['pending', 'closed'];
  constructor(
    private fb: FormBuilder,
    private particularService: UserService,
    public dialogRef: MatDialogRef<AddParticularDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.particularForm = this.fb.group({
      particular_name: ["", Validators.required],
      amount: ["", Validators.required],
      status: ["", Validators.required],
      particular_id: ["", []],
      date: ["", []],
      user_id: ["", []]
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addParticular() {
    this.particularForm.patchValue({
      particular_id: (1 + (Math.random()) * 0x10000000) | 0,
      date: new Date(),
      user_id: this.data.userId
    });

    this.particularService.addParticularDetails(this.particularForm.value).subscribe((res: any) => {
      
    });
  }
}

