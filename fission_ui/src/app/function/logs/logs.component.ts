import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Project } from 'src/app/_model/project';
import { FunctionService } from 'src/app/_services/function.service';
import { ProjectService } from 'src/app/_services/project.service';
import { Function } from '../../_model/function';
import { NgbDateStruct,NgbTimeStruct,NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  //startCtrl = new FormControl();
  userId: string = "";
  time: NgbTimeStruct;// = {hour: 13, minute: 10, second: 10};
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;
  model: NgbDateStruct;
  functionLogsForm: FormGroup = this.formBuilder.group({
    projectName:  ['', Validators.required],
    functionName:  ['', Validators.required],
    timestamp: ['', Validators.required],
    limits: ['', Validators.required]
  });
  projectName: string = "";
  functionName: string = "";
  functionLogsList: any = [];
  emptyLogsFlag: boolean = false;
  isFunctionLogsNull: boolean = true;
  currentDate=(new Date()).toISOString();
  date: { year: number, month: number, day: number };
  paginatedData: any = [];
  currentPage: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  alertMsg: string = "";
  projectsList: Array<Project> = [];
  submitted: boolean = false;
  breadcrumb: Array<any> = [];

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private functionService: FunctionService,
    private alertConfig: NgbAlertConfig,
    private router: Router,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.route.queryParams.subscribe(params => {
      this.projectName = params['project'];
    });
    this.route.queryParams.subscribe(params => {
      this.functionName = params['function'];
      this.listProjects(); 
    });
    console.log("Project",this.projectName);
    console.log("Function",this.functionName);
    console.log("currentDate",this.currentDate);

    this.functionLogsForm = this.formBuilder.group({
      projectName:  this.projectName,
      functionName: this.functionName,
      timestamp: ['', Validators.required],
      limits: ['', Validators.required]
    })

    this.functionLogsForm.controls['projectName'].disable();
    this.functionLogsForm.controls['functionName'].disable();

    this.breadcrumb= [
      {​​​​​​​​ url: "/projects/home", params : {'project': this.projectName} , name:'Home'}​​​​​​​​,
      {​​​​​​​​ url:'', params : '' , name:'Logs'}​​​​​​​​
      ];
   
  }

  listProjects(){
    console.log("project inside create/deploy: ",this.projectName);
    this.projectService.listProjects(this.userId).subscribe((data: any) => {
      this.projectsList = data;
      console.log("projects List :", this.projectsList);
      let redirect2: boolean = false;
      for(let project of this.projectsList){
        if(this.projectName == project['projectName']){          
          if(project['projectRoleName'] == "PROJECT_VIEWER"){
            redirect2 = true;
            console.log("Routing to home");            
          }
          else{
            this.functionService.listFunctions(this.projectName).subscribe((data: any) => {
              if(data == undefined || data.length < 0){

              }
              else{
                let redirect: boolean = false;
                for(let func of data){
                  if(func['functionName'] == this.functionName){
                    redirect = true;
                  }                  
                }
                if(!redirect){
                  console.log("Routing to home");
                  this.router.navigate(['projects/home'], { queryParams: { project: project['projectName']}});
                }

              };
            },
            (err: any) => {
              console.log(err);
            })
          }
        }
      }
      if(redirect2){
        this.router.navigate(['projects/home'], { queryParams: { project: this.projectName}});
      }
    },
      err => {
        console.log(err);
        console.log(err.error.message);
      })
  }

  refreshPagination(){
    this.paginatedData =  this.functionLogsList
      .slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
      console.log("paginated Data:", this.paginatedData);
  }

  navigateEvent(event: any) {
    this.date = event.next;
    console.log("date:",this.date);
  }

  newProjectObject(projectObj: Project){
    console.log("Project Object in parent: ",projectObj);
    if(projectObj == undefined){
      console.log("Null Projects");
    }
     else{
      console.log("Project Obj", projectObj);
    }
  }

  get f(){
    return this.functionLogsForm.controls;
  }

  getFunctionLogs(){
    this.submitted = true;
    if(this.functionLogsForm.invalid){
      return;
    }
    var functionObj : Function = new Function();
    functionObj.projectName = this.functionLogsForm.controls['projectName'].value;
    functionObj.functionName = this.functionLogsForm.controls['functionName'].value;
    functionObj.timestamp = (new  Date (this.functionLogsForm.controls['timestamp'].value)).toISOString();
    functionObj.limits = this.functionLogsForm.controls['limits'].value;
    console.log("Function Obj:",functionObj);
    this.functionService.getFunctionLogs(functionObj).subscribe((data: any) => {
      console.log("data",data);
      this.functionLogsList= data;      
      if(this.functionLogsList == null || this.functionLogsList.length < 0){
        this.isFunctionLogsNull = true;
        this.emptyLogsFlag = true;
      }  
      else{
        this.collectionSize = this.functionLogsList.length;
        this.refreshPagination();
        this.isFunctionLogsNull = false;
        this.emptyLogsFlag = false;
      }
      
    },
      err => {
        this.alertConfigurations("danger");
        this.alertMsg = err.error.error;
        console.log(err);
        console.log(err.error.message);
      })

  }

  alertConfigurations(type: string){
    this.alertConfig.type = type;
  }

}
