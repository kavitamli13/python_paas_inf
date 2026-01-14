import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../_model/user';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    userId: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  returnUrl: string = "";
  resData: any = {};
  loginbtn: boolean = false;
  loadingImg: boolean = false;
  errMsg: string = "";
  regParam: string = "";
  userDetail: any = {};
  userRole: string = "";
  errorMsg: string = '';
  loginError: boolean = false;
  allowAdminRole: any;
  allowsAdminRole: any;
  alertMessage: string = "";


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertConfig: NgbAlertConfig) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.authenticationService.logout();

  }

  get f() { return this.loginForm.controls; }
  uDetais: any;
  uuDetails: any;
  enableLogin: boolean = true;

  // if(this.loginForm.controls['userId'].value != '' && this.loginForm.controls['password'].value != ''){
  //   this.enableLogin = true;
  // }

  emailClick() {
    if (this.loginForm.controls['userId'].value != '' && this.loginForm.controls['password'].value != '') {
      this.enableLogin = false;
    }
  }
  passwordClick() {
    if (this.loginForm.controls['userId'].value != '' && this.loginForm.controls['password'].value != '') {
      //alert()
      this.enableLogin = false;
    }
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.controls['userId'].value, this.loginForm.controls['password'].value)
    .subscribe((data) => {
      //localStorage.setItem('user', JSON.stringify(data));
      this.uDetais = JSON.stringify(data);
      this.userDetail = JSON.parse(this.uDetais);
      //console.log("userDetails: ",JSON.parse(this.uDetais));
      localStorage.setItem('token', this.userDetail["token"]);
      localStorage.setItem('userId', this.userDetail['userId']);
      localStorage.setItem('orgRole', this.userDetail['orgRole']);
      localStorage.setItem('userName',this.userDetail['name']);
      this.userRole = this.userDetail["orgRole"];
      if (this.userRole == "ROOT"){
        this.router.navigateByUrl('/root/users');
      }
      else{
        this.router.navigateByUrl('projects');
      }
      this.loading = false;
  

    },
      err => {
        console.log("Error in authentication");
        this.loading = false;
        this.alertMessage = "Invalid Credentials";
        this.alertConfigurations("danger");
        this.loginError = true;
        this.loginForm.reset();
        this.submitted= false;
      })

  }

  private ErrorBack(msg: string) {
    this.errMsg = msg;
    this.loginbtn = false;
    this.loadingImg = false;
  }

  alertConfigurations(type: string){
    this.alertConfig.type = type;
  }

}
