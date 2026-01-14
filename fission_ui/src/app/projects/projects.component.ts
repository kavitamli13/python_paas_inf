import { Component, OnInit } from '@angular/core';
import { Project } from '../_model/project';
import { ProjectService } from '../_services/project.service';
import { FunctionService } from '../_services/function.service';
import { Function } from '../_model/function';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  currentProjectObj: Project;
  userId: string = "";
  userOrgRole: string = "";
  projectsList: Array<Project> = [];
  functionsList: Array<Function> = [];
  projectName: string = "";
  projectRole: string = "";
  isViewerFlag: boolean = false;
  isOwnerFlag: boolean = false;
  isEditorFlag: boolean = false;
  isORGAdminFlag: boolean = false;
  isProjectListNull: boolean = true;
  isCreateProject: boolean = false;
  enableCreateProject: boolean = true;
  submitted: boolean = false;
  isFunctionListNull: boolean = true;
  createProjectForm: FormGroup = this.formBuilder.group({
    userId: ['', [Validators.required, Validators.email]],
    projectName: ['', Validators.required]
  });
  functionDescription: any = [];
  functionDescriptionFlag: boolean = false;
  functionLabels: any = [];
  functionAnnotations: any = [];
  functionAnnotationKeys: any = [];
  functionAnnotationValues: any = [];
  scaleToZeroFlag: boolean = false;
  userMsg: string = "";
  closeResult: string = "";
  functionInvocationCount: string = "";
  functionUrl: string = "";
  functionTriggerType: string = "";
  isProjectComponent: boolean = true;
  paginatedData: Array<Function> = [];
  currentPage: number = 1;
  pageSize: number = 5;
  collectionSize: number = 0;
  projectObject: Project = new Project();

  constructor(private projectService: ProjectService,
    private functionService: FunctionService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId") + "";
    this.userOrgRole = localStorage.getItem("orgRole") + "";
    if (this.userOrgRole == "ORG_ADMIN") {
      this.isORGAdminFlag = true;
    }
    // this.listProjects(this.userId);

  }


  newProjectObject(projectObj: Project) {
    
      this.projectObject = projectObj;
   
    
    this.currentProjectObj = this.projectObject;
    console.log("Project Object in project ", this.projectObject);
    console.log("Router url: ", this.router.url);

    if (this.router.url.includes("/projects/home")) {
      console.log("Go to home project");
      this.router.navigate(['projects/home'], { queryParams: { project: projectObj['projectName'] } });
      //this.router.navigateByUrl('projects/home?project='+this.projectObject['projectName']);
    }
    else if (this.router.url.includes("/projects/manage")) {
      console.log("Go to manage project");
      this.router.navigate(['projects/manage'], { queryParams: { action: 'manageProject', project: this.projectObject['projectName'] } });
      //this.router.navigateByUrl('projects/manage?action=manageProject&project='+this.projectObject['projectName']);
    }
    else if (this.router.url.includes("/projects/usage")) {
      console.log("Go to usage project");
      this.router.navigateByUrl('projects/usage?action=usageProject&project=' + this.projectObject['projectName']);
    }
    else if(this.router.url.includes("/projects/function/logs")){
      console.log("Go to Function log");      
      this.router.navigate(['/projects/function/logs'], { queryParams: { project: this.projectObject['projectName'], function: this.route.snapshot.queryParams['function'] } });

    }
    else if (this.router.url.includes("/projects/function")) {
      if (this.route.snapshot.queryParams['action'] == "createFunction") {
        console.log("Go to create function");
        this.router.navigate(['/projects/function'], { queryParams: { action: 'createFunction', project: this.projectObject['projectName'] } });
      }
      else{      
          this.router.navigate(['projects/function'], { queryParams: { action: 'deployFunction', project: this.projectObject['projectName'], function: this.route.snapshot.queryParams['function'] } });
           }
    }
    else {
      console.log("Go to home project-initial step");
      this.router.navigate(['projects/home'], { queryParams: { project: projectObj['projectName'] } });
      //this.router.navigateByUrl('projects/home?project='+this.projectObject['projectName']);
    }
  }



  
}
