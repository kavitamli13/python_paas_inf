import { Component, OnInit } from '@angular/core';
import { Project } from '../../_model/project';
import { ProjectService } from '../../_services/project.service';
import { FunctionService } from '../../_services/function.service';
import {Function} from '../../_model/function';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HighlightSpanKind } from 'typescript';


@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {
  projectObj: Project;
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
  functionDescription: any =[];
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
  public breadcrumb : Array<any> = []; 

  constructor(private projectService: ProjectService,
     private functionService: FunctionService,
      private formBuilder: FormBuilder,
      private modalService: NgbModal,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId") + "";
    this.userOrgRole = localStorage.getItem("orgRole") + "";
    if (this.userOrgRole == "ORG_ADMIN") {
      this.isORGAdminFlag = true;
    }
    console.log("Inside Home");
    
    this.route.queryParams.subscribe(params => {
      this.projectName = params['project']; 
      this.listProjects();    
    
    console.log("Project name in home:",this.projectName);
    if(this.projectName == undefined || null){
      console.log("No project selected");
    }
  });

  this.breadcrumb= [
    {​​​​​​​​ url:'projects/home', name:'Home'}​​​​​​​​,
    {​​​​​​​​ url:'projects/', name:'Templates'}​​​​​​​​
    ];
   
  }
    

  
  newProjectObject(projectObj: Project){
    console.log("Project Object in HOme-parent: ",projectObj);
    if(projectObj == undefined){
      this.isProjectListNull = true;
      console.log("Null Projects");
    }
    else{
      this.isProjectListNull = false;
      this.projectRole = projectObj['projectRoleName'];
      this.projectName = projectObj['projectName'];
      console.log("Project name", this.projectName);
      this.manageProjectRole(this.projectRole);
      this.listFunctions(this.projectName);      
    }
    //this.getProjectName(projectObj);
  }

  refreshPagination(){
    this.paginatedData =  this.functionsList
      .slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
      console.log("paginated Data:", this.paginatedData);
  }


  listProjects() {
    this.projectService.listProjects(this.userId).subscribe((data: any) => {
      this.projectsList = data;
      if(this.projectsList == null || undefined || this.projectsList.length <=0){
        this.isProjectListNull = true;
      }
      else{
        this.isProjectListNull = false;
      }
      console.log("projects List :", this.projectsList);
      for(let project of this.projectsList){
        if(this.projectName == project['projectName']){
          this.manageProjectRole(project['projectRoleName']);
          this.listFunctions(this.projectName);
        }
      }
    },
      err => {
        console.log(err);
        console.log(err.error.message);
      })
  }

  getProjectName(projectObj: any) {
    let projectName = projectObj['projectName'];
    let projectRole = projectObj['projectRoleName'];
    console.log("Project name", projectName);
    this.manageProjectRole(projectRole);
    this.listFunctions(projectName);
  }

  
  listFunctions(projectName: string) {
    this.functionService.listFunctions(projectName).subscribe((data: any) => {
      this.functionsList = data;
      this.collectionSize = this.functionsList.length;
      console.log("Total size:",this.collectionSize);
      this.refreshPagination();
      if (this.functionsList.length > 0) {
        this.isFunctionListNull = false;
      }
      else{
        this.isFunctionListNull = true;
      }
      console.log("Functions List :", this.functionsList);
    },
      (err: any) => {
        console.log(err);
      })
  }

  manageProjectRole(projectRole: string) {
    console.log("Project Role", projectRole);
    this.isViewerFlag = false;
    if(projectRole == "PROJECT_VIEWER"){
      //this.isOwnerFlag = true;
      this.isViewerFlag = true;
    }
    else{
      this.isViewerFlag = false;
    }
  }

  deleteFunction(functionObj: Function) {
    console.log("delete function ", functionObj);  
    functionObj.projectName = this.projectName;
    this.functionService.deleteFunction(functionObj).subscribe((data: any) => {
      this.listFunctions(this.projectName);
      console.log("Functions List :", this.functionsList);
    },
      err => {
        //alert("Something Went wrong);
        //this.loginError = true;
        console.log(err);
        console.log(err.error.message);
      })
  }
  // createProjectPopUp() {
  //   this.isCreateProject = true;
  // }
  // createProject(){
  //   this.createProjectForm.controls['userId'].setValue(this.userId);
  //   this.submitted = true;
  //   if(this.createProjectForm.invalid){
  //     console.log("Create project :",this.createProjectForm.value);
  //     return;
  //   }
  //   this.projectService.createProject(this.createProjectForm.value).subscribe((data: any) => {
  //     this.listProjects(this.userId);
  //   },
  //     err => {
  //       //console.log(err);
  //       this.userMsg = err.error.message;
  //       console.log(err.error.message);
  //     })
  // }

  // projectNameClick(){
  //   if (this.createProjectForm.controls['projectName'].value != '') {
  //     //alert()
  //     this.enableCreateProject = false;
  //   }
  // }

  // get f() { return this.createProjectForm.controls; }

  getFunctionDescription(functionObj: Function){
    functionObj.projectName = this.projectName;
    this.functionService.getFunctionDescription(functionObj).subscribe((data: any) => {
      this.functionDescription = data;
        this.functionDescriptionFlag = true;
        //this.functionLabels = this.functionDescription['labels'];
        this.functionLabels = this.functionDescription['functionName'];
        //this.scaleToZeroFlag = this.functionLabels["com.openfaas.scale.zero"];
        this.scaleToZeroFlag = false;
        //this.functionAnnotations = this.functionDescription["annotations"];
        this.functionAnnotations = this.functionDescription["annotations"];
        //this.functionInvocationCount = this.functionDescription["invocationCount"];
        this.functionInvocationCount = "0";
        this.functionTriggerType = this.functionDescription["triggerType"];
        this.functionUrl = this.functionDescription["functionUrl"];
        
      console.log("Functions Description :", this.functionDescription);
      console.log("Functions Annotation :", this.functionAnnotations);
    },
      err => {
        //alert("Something Went wrong);
        //this.loginError = true;
        console.log(err);
        console.log(err.error.message);
      })
      //this.modalService.open('functionDescription');
  }


  open(functionObj: string) {
    //this.getFunctionDescription(functionObj);
    this.modalService.open(functionObj, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
