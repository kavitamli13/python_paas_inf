import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_model/project';
import { ProjectService } from 'src/app/_services/project.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {
  public projectName: string = "";
  public projectUsageLists: any;
  public isprojectUsageListsNull: boolean = true;
  total: number=0;
  paginatedData: any = [];
  currentPage: number = 1;
  pageSize: number = 5;
  collectionSize: number = 0;
  alertMsg: string = "";
  breadcrumb: Array<any> = [];

  constructor(private route: ActivatedRoute,
     private projectService: ProjectService,
      private router: Router,
      private alertConfig: NgbAlertConfig) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectName = params['id'];
    });
    console.log("projectName: ",this.projectName);  
    
    this.breadcrumb= [
      {​​​​​​​​ url: "/projects/home", params : {'project': this.projectName} , name:'Home'}​​​​​​​​,
      {​​​​​​​​ url: "/projects/manage", params : { 'action' : 'manageProject' , 'project' : this.projectName} , name:'Manage'}​​​​​​​​,
      {​​​​​​​​ url: "", params : "" , name:'Usage'}​​​​​​​​
      ];

      this.getProjectUsage();
  }

  refreshPagination(){
    this.paginatedData =  this.projectUsageLists
      .slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
      console.log("paginated Data:", this.paginatedData);
  }

  newProjectObject(projectObj: Project){
    console.log("Project Object in parent: ",projectObj);
    if(projectObj == undefined){
      console.log("Null Projects");
    }
     else{
    //   this.projectRole = projectObj['projectRoleName'];
    //   this.projectName = projectObj['projectName'];
      console.log("Project name", projectObj['projectName']);
      //this.manageProjectRole(this.projectRole);
    }
    //this.getProjectName(projectObj);
  }

  getProjectUsage(){
    var projectObj : Project = new Project();
    projectObj.projectName = this.projectName;
    this.projectService.getProjectUsage(projectObj).subscribe((data: any) => {
      this.projectUsageLists = data;
      if (this.projectUsageLists == undefined || this.projectUsageLists.length <= 0) {
        this.isprojectUsageListsNull = true;
      } else{
        this.isprojectUsageListsNull = false;
        this.collectionSize = this.projectUsageLists.length;
        this.refreshPagination();
        this.totalUsage();
      }  
      console.log("project usage:", this.projectUsageLists);      
    },
      err => {
        this.alertMsg = err.error;
        this.alertConfigurations("danger");
        console.log(this.alertMsg);
      })
  }

  totalUsage(){
    this.total = 0;
    for(let projectUsage of this.projectUsageLists){
        this.total += parseFloat(projectUsage['usage']); 
    }
    console.log("Total: ",this.total);
  }

  alertConfigurations(type: string){
    this.alertConfig.type = type;
  }

}

