import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_model/user';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgbModal, ModalDismissReasons, NgbAlertConfig, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public submitted: boolean = false;
  public addUserPopUpFlag: boolean = false;
  loading: boolean = false
  public userRoles: any = [];
  public usersList: Array<User> = new Array();
  public addUserForm: FormGroup = this.formBuilder.group({
    userId: ['', [Validators.required, Validators.email]],
    name: [''],
    orgRoleId: ['', Validators.required]
  })
  closeResult: string =  '';
  enableLogin: boolean = true;
  addUserError: string = "";
  alertMessage: string = "";
  
  currentPage: number = 1;
  pageSize: number = environment.pageSize;
  collectionSize: number = 0;
  paginatedData: User[];
  alertClosed: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private alertConfig: NgbAlertConfig) {}

  ngOnInit(): void {

    if("ROOT" != localStorage.getItem('orgRole')){
      this.router.navigateByUrl('/auth/login');
    }

    this.getUserRoles();
    this.getAllUsers();
      
  }

  
  open(addUser: string) {
    this.modalService.open(addUser, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.resetAddUserForm();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  resetAddUserForm(){
    this.addUserForm.reset();
    this.enableLogin = true;
  }

  getUserRoles() {

    this.authenticationService.getUserRoles().subscribe((data: any) => {
      this.userRoles = data;
      console.log("Roles list :", this.userRoles);
    },
      err => {
        console.log(err);
        console.log(err.error.message);
      })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      console.log("Invalid form",this.addUserForm.value);
      return;
    }
    this.loading = true;
    console.log("addUserForm: ", this.addUserForm.value);
    this.authenticationService.addUserToOrg(this.addUserForm.value)
      .subscribe((data) => {
        this.resetAddUserForm();
        this.getAllUsers();
        // this.router.navigateByUrl('/root/users');
        this.loading = false;
        this.modalService.dismissAll();
        this.alertMessage = "User added successfully!!!"
        this.alertConfigurations('success');
      },
        err => {
          //alert("Something Went wrong);
          //this.loginError = true;
          this.modalService.dismissAll();
          console.log(err.error.message);

          this.loading = false;
          this.resetAddUserForm();
          this.submitted = false;
          this.alertMessage = err.error.message;
          this.alertConfigurations('danger');
        })
  };

  get f() { return this.addUserForm.controls; }


  addUserPopUp() {
    this.addUserPopUpFlag = true;
    console.log("Inside add user");
  }

  


  emailClick() {
    if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['name'].value != '' && this.addUserForm.controls['orgRoleId'].value != '') {
      this.enableLogin = false;
    }
  }

  nameClick() {
    if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['name'].value != '' && this.addUserForm.controls['orgRoleId'].value != '') {
      //alert()
      this.enableLogin = false;
    }
  }

  roleClick() {
    if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['name'].value != '' && this.addUserForm.controls['orgRoleId'].value != '') {
      //alert()
      this.enableLogin = false;
    }
  }

  getAllUsers() {
    this.authenticationService.listUsersOfOrg().subscribe((data: any) => {
      this.usersList = data;
      this.collectionSize = this.usersList.length;
      this.refreshPagination();
      console.log("users list :", this.usersList);
      console.log("page users list :", this.paginatedData);
    },
      err => {
        //alert("Something Went wrong);
        //this.loginError = true;
        console.log(err);
        console.log(err.error.message);
      })
  }

  refreshPagination(){
    this.paginatedData = this.usersList
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
  }

  deleteUser(user: User){
    this.authenticationService.deleteUserFromOrg(user).subscribe((data: any) => {
      this.getAllUsers();
      this.alertMessage = "User deleted successfully...";
      this.alertConfigurations("success");
    },
      err => {
        //alert("Something Went wrong);
        //this.loginError = true;
        console.log(err);
        console.log(err.error.message);
        this.alertMessage = err.error.message;
        this.alertConfigurations("danger");
      })
  }

  alertConfigurations(type: string){
    this.alertConfig.type = type;
    //this.alertConfig.dismissible = true;
  }

  
}
