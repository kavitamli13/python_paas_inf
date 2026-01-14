import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthenticationService} from '../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_model/project';
import { ProjectService } from 'src/app/_services/project.service';
import { NgbModal, ModalDismissReasons, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent implements OnInit {

  @Output() newProjectObject = new EventEmitter<Project>();
  createProjectForm: FormGroup = this.formBuilder.group({
    userId: ['', [Validators.required, Validators.email]],
    projectName: ['', Validators.required]
  });  
  userId: string = "";
  userOrgRole: string = "";
  projectsList: Array<Project> = [];
  userName: string = "";
  userRole: string = "";
  isORGAdminFlag: boolean = false;
  projectOwnerFlag: boolean = false;
  isProjectListNull: boolean = false;
  closeResult: string = "";
  userMsg: string = "";
  enableCreateProject: boolean = true;
  isRootUser: boolean = false;

  constructor(
    private authenticationService:AuthenticationService,
     private router: Router,
      private projectService: ProjectService,
      private modalService: NgbModal,
      private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
      this.userName = localStorage.getItem('userName') + "";
      console.log("User Name:", this.userName); 
      this.userId = localStorage.getItem("userId") + "";
    this.userOrgRole = localStorage.getItem("orgRole") + "";
    switch(this.userOrgRole){
      case "ROOT":
        this.isRootUser = true;
        this.getProjectObject("");
        break;
      case "ORG_ADMIN":
        this.isORGAdminFlag = true;
        this.listProjects(this.userId);  
        break;
      default:
        this.listProjects(this.userId);  
        break;
    }
    // if(this.userOrgRole == "ROOT"){
    //   this.isRootUser = true;
    // }
    // else if(this.userOrgRole == "ORG_ADMIN") {
    //   this.isORGAdminFlag = true;
    // }
    // this.listProjects(this.userId);  
  }

  listProjects(userId: any) {
    this.projectService.listProjects(userId).subscribe((data: any) => {
      this.projectsList = data;
      if (this.projectsList.length > 0) {
        this.isProjectListNull = false;
        this.getProjectObject(this.projectsList[0].projectName);
      }
      else{
        this.isProjectListNull = true;
        this.getProjectObject("");
      }
      
      //console.log("Headers projects List :", this.projectsList);
    },
      (err: any) => {
        console.log(err);
        console.log(err.error.message);
      })
  }


  getProjectObject(event: any){
    let projectName: string =  "";
    if(event.target == null || event.target == undefined){
      projectName = event;
    }
    else{
      projectName = event.target.value;
    }
    console.log("Header projectName:",projectName);
    if(projectName == ""){
      this.newProjectObject.emit(); 
    }
    else{
    for (let project of this.projectsList) {
      if (projectName == project['projectName']) {
        if(project['projectRoleName'] == "PROJECT_OWNER"){
          this.projectOwnerFlag = true;
        }
        else{
          this.projectOwnerFlag = false;
        }
        console.log("Project Object in Child: ",project);
        this.newProjectObject.emit(project);  
      }
    }
  }
      
  }


  open(createProject: string) {
    this.modalService.open(createProject, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.createProjectForm.reset();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  projectNameClick(){
    if (this.createProjectForm.controls['projectName'].value != '') {
      this.enableCreateProject = false;
    }
  }

  get f() { return this.createProjectForm.controls; }

  onSubmit(){
    this.createProjectForm.controls['userId'].setValue(this.userId);
    if(this.createProjectForm.invalid){
      console.log("Create project :",this.createProjectForm.value);
      return;
    }
    this.projectService.createProject(this.createProjectForm.value).subscribe((data: any) => {
      this.modalService.dismissAll();
      this.enableCreateProject = true;
      this.listProjects(this.userId);
    },
      err => {
        //console.log(err);
        this.enableCreateProject = true;
        this.userMsg = err.error.message;
        console.log(this.userMsg);
      })
  }
  
logOut(){
this.authenticationService.logout();
this.router.navigateByUrl("/auth/login");
}
}
