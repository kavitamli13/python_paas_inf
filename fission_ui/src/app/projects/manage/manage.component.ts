import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersComponent } from 'src/app/root/users/users.component';
import { Project } from 'src/app/_model/project';
import { User } from 'src/app/_model/user';
import { ProjectService } from 'src/app/_services/project.service';
import { NgbModal, ModalDismissReasons, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  addUserForm: FormGroup = this.formBuilder.group({
    userId: ['', [Validators.required, Validators.email]],
    roleId: ['', Validators.required]
  });
  editUserForm: FormGroup = this.formBuilder.group({
    userId: ['', [Validators.required, Validators.email]],
    roleId: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  userId: string = "";
  public projectName: string = "";
  public projectUsers: Array<any> = new Array();
  public isProjectUsersNull : boolean = true;
  public ProjectRoles: any;
  public enableAdd:boolean = true;
  public roleId: string = "";
  public isAddUserFlag: boolean = false;
  public isEditUserFlag: boolean = false;
  public enableEdit:boolean = true;
  closeResult: any;
  alertMsg: string = "";
  projectsList: Array<Project> = [];
  paginatedData: Array<Function> = [];
  currentPage: number = 1;
  pageSize: number = 5;
  collectionSize: number = 0;
  breadcrumb: Array<any> = [];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
     private projectService: ProjectService,
      private router: Router,
      private modalService: NgbModal,
      private alertConfig: NgbAlertConfig) { }

  ngOnInit(): void {
    console.log("Inside Manage");
    this.userId = localStorage.getItem("userId");
    this.route.queryParams.subscribe(params => {
      //console.log("params:",params);
      this.projectName = params['project'];
    
    console.log("project name in manage:",this.projectName);

    if(this.projectName == undefined || null){
      console.log("Null Projects");
    }
    else{
      this.listProjects();
    }

  });
    
   
    //this.getProjectUsers(this.projectName);
    // this.projectUsers.forEach(user =>{
    //   if(!((user.userId) == localStorage.getItem("userId") && user.roleId == 'PR001')){
    //     this.router.navigateByUrl("/projects");
    //   }
    // })

    this.addUserForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.email]],
      roleId: ['', Validators.required]
    })

    this.editUserForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.email]],
      roleId: ['', Validators.required]
    })

    this.breadcrumb= [
      {​​​​​​​​ url: "/projects/home", params : {'project': this.projectName} , name:'Home'}​​​​​​​​,
      {​​​​​​​​ url:'', params : '' , name:'Manage'}​​​​​​​​
      ];

    
  }

  listProjects() {
    this.projectService.listProjects(this.userId).subscribe((data: any) => {
      this.projectsList = data;
      console.log("projects List :", this.projectsList);
      for(let project of this.projectsList){
        if(this.projectName == project['projectName']){
          this.manageProjectRole(project['projectRoleName']);
        }
      }
    },
      err => {
        console.log(err);
        console.log(err.error.message);
      })
  }

  manageProjectRole(projectRole: string) {
    console.log("Project Role", projectRole);
    if(projectRole == "PROJECT_OWNER"){
      this.getProjectUsers();
      this.getProjectRoles();
    }
    else{
      this.router.navigateByUrl('projects/home?project='+this.projectName);
    }
  }  

  getProjectRoles(){
    this.projectService.getProjectRoles(this.projectName).subscribe((data: any) => {
      this.ProjectRoles = data;
     console.log("Project Roles:",this.ProjectRoles);
    },
      err => {
        console.log(err);
        console.log(err.error.message);
      })
  }

  getProjectUsers(){
    this.projectService.getProjectInfo(this.projectName).subscribe((data: any) => {
      this.projectUsers = data;
      this.refreshPagination();
      this.collectionSize = this.projectUsers.length;
      if (this.collectionSize > 0) {
        this.isProjectUsersNull = false;
      } else{
        this.isProjectUsersNull = true;
      }       
      console.log("projects users :", this.projectUsers);
    },
      err => {
        //alert("Something Went wrong);
        //this.loginError = true;
        console.log(err);
        console.log(err.error.message);
      })
  }

  refreshPagination(){
    this.paginatedData =  this.projectUsers
      .slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
      console.log("paginated Data:", this.paginatedData);
  }

 
  addUserFlag(flag: boolean){
    this.isAddUserFlag = flag;
  }

  open(data: string) {
    this.modalService.open(data, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.resetAddUserForm();
    this.resetEditUserForm();
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
    this.enableAdd = true;
    this.submitted = false;
  }

  resetEditUserForm(){
    this.editUserForm.reset()
  }

  editUserFlag(user: Project){
    // this.isEditUserFlag = flag;
    // console.log("userObj:",user);
    // if(flag){
      this.editUserForm = this.formBuilder.group({
        userId: user.userId,
        roleId: user.roleId
      })
      this.editUserForm.controls['userId'].disable();
  //}
  }


  editUserRole(){
    var projectObj : Project = new Project();
    projectObj.projectName = this.projectName;
    this.editUserForm.controls['userId'].enable();
    projectObj.userId = this.editUserForm.controls['userId'].value;
    projectObj.roleId = this.editUserForm.controls['roleId'].value;
    this.projectService.modifyUserRole(projectObj).subscribe((data: any) => {
      this.alertMsg = data['message'];
      this.alertConfiguration("success");
      this.getProjectUsers(); 
      this.resetEditUserForm();
    },
      err => {
        console.log(err);
        console.log(err.error.message);
        this.alertMsg = err.error.message;
        this.alertConfiguration("success");
        this.resetEditUserForm();
      })
  }


  deleteUser(user: Project){
    var projectObj : Project = new Project();
    projectObj.projectName = this.projectName;
    projectObj.userId = user.userId;
    this.projectService.deleteUserFromProject(projectObj).subscribe((data: any) => {
      this.alertMsg = data['message'];
      this.alertConfiguration("success");
      this.getProjectUsers();
          },
      err => {
        console.log(err);
        console.log(err.error.message);
        this.alertMsg = err.error.message;
        this.alertConfiguration("danger");
      })
  }

  deleteProject(){
    var projectObj : Project = new Project();
    projectObj.projectName = this.projectName;
    this.projectService.deleteProject(projectObj).subscribe((data: any) => {
      this.router.navigateByUrl('projects');
    },
      err => {
        //alert("Something Went wrong);
        //this.loginError = true;
        console.log(err);
        console.log(err.error.message);
      })
  }

  get f() { return this.addUserForm.controls; }

  changeRoleId(roleId: string){
    console.log("Role: ",roleId);
    this.addUserForm.setValue({'roleId': roleId},{'onlySelf': true})
    
  }

  emailClick() {
    if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['roleId'].value != '') {
      this.enableAdd = false;
    }
  }

  roleSelect(){
    if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['roleId'].value != '') {
      this.enableAdd = false;
    }
  }


  //Add user function
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }
    this.loading = true;
    var projectObj : Project = new Project();
    projectObj.projectName = this.projectName;
    projectObj.userId = this.addUserForm.controls['userId'].value;
    projectObj.roleId = this.addUserForm.controls['roleId'].value;
    console.log("projectObj: ",projectObj);
    this.projectService.addUserToProject(projectObj)
    .subscribe((data) => {
      this.alertMsg = data['message'];
      this.alertConfiguration("success");
      this.loading = false;
      this.getProjectUsers();
      this.resetAddUserForm();
  

    },
      err => {
        console.log(err);
        this.alertConfiguration("danger");
        this.alertMsg = err.error.message;
        this.loading = false;
        this.resetAddUserForm();
        this.submitted= false;
      })

  }

  alertConfiguration(type: string){
    this.alertConfig.type = type;
  }

}
