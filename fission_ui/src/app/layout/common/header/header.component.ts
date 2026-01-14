import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_model/project';
import { ProjectService } from 'src/app/_services/project.service';
import { NgbModal, ModalDismissReasons, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentProjectObj: Project;
  @Output() newProjectObject = new EventEmitter<Project>();
  createProjectForm: FormGroup = this.formBuilder.group({
    userId: ['', [Validators.required, Validators.email]],
    projectName: ['', Validators.compose([Validators.maxLength(25),
    Validators.minLength(2),
    Validators.required,
    Validators.pattern('^[a-z0-9_-]+$')])]
  });
  submitted: boolean = false;
  projectName: string = "";
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
  alertMessage: String = "";

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private projectService: ProjectService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertConfig: NgbAlertConfig) { }

  ngOnInit(): void {

    this.userName = localStorage.getItem('userName') + "";
    console.log("User Name:", this.userName);
    this.userId = localStorage.getItem("userId") + "";
    this.createProjectForm.controls['userId'].setValue(this.userId);
    this.userOrgRole = localStorage.getItem("orgRole") + "";
    switch (this.userOrgRole) {
      case "ROOT":
        this.isRootUser = true;
        this.newProjectObject.emit();
        break;
      case "ORG_ADMIN":
        this.isORGAdminFlag = true;
        this.listProjects(this.userId);
        break;
      default:
        this.listProjects(this.userId);
        break;
    }
  }

  listProjects(userId: any) {
    this.projectService.listProjects(userId).subscribe((data: any) => {
      this.projectsList = data;
      if (this.projectsList.length > 0) {
        this.isProjectListNull = false;
        if (this.currentProjectObj == null || this.currentProjectObj.projectName == null) {
          if (this.route.snapshot.queryParams['project'] == null || this.route.snapshot.queryParams['project'] == undefined) {
            this.getProjectObject(this.projectsList[0].projectName);
          }
          else {
            this.getProjectObject(this.route.snapshot.queryParams['project']);
          }
        }
        else {
          this.getProjectObject(this.currentProjectObj.projectName);
        }
      }
      else {
        this.isProjectListNull = true;
        this.getProjectObject("");
      }

      //console.log("Headers projects List :", this.projectsList);
    },
      (err: any) => {
        //console.log(err);
        console.log(err.error.message);
      })
  }


  getProjectObject(event: any) {
    let projectName: string = "";

    if (event.target == null || event.target == undefined) {
      projectName = event;
    }
    else {
      projectName = event.target.value;
    }
    //console.log("Header projectName:",projectName);
    this.projectName = projectName;
    if (projectName == "") {
      this.newProjectObject.emit();
    }
    else {
      for (let project of this.projectsList) {
        if (projectName == project['projectName']) {
          if (project['projectRoleName'] == "PROJECT_OWNER") {
            this.projectOwnerFlag = true;
          }
          else {
            this.projectOwnerFlag = false;
          }
          console.log("Project Object in Child: ", project);
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

  projectNameClick() {
    if (this.createProjectForm.controls['projectName'].value != '') {
      this.enableCreateProject = false;
    }
  }

  get f() { return this.createProjectForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.createProjectForm.controls['userId'].setValue(this.userId);
    if (this.createProjectForm.invalid) {
      console.log(this.submitted, this.f.projectName.errors)
      console.log("Invalid form", this.createProjectForm.value);
      return;
    }

    this.projectService.createProject(this.createProjectForm.value).subscribe((data: any) => {
      this.modalService.dismissAll();
      this.enableCreateProject = true;
      this.alertConfigurations("success");
      this.alertMessage = data['message'];
      this.listProjects(this.userId);
    },
      err => {
        //console.log(err);
        this.submitted = true;
        this.enableCreateProject = true;
        this.modalService.dismissAll();
        this.createProjectForm.reset();
        this.alertConfigurations("danger");
        this.alertMessage = err.error.message;

      })
  }

  alertConfigurations(type: string) {
    this.alertConfig.type = type;
    //this.alertConfig.dismissible = true;
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigateByUrl("/auth/login");
  }
}
