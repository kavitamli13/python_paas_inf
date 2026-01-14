import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../_services/spinner.service';
import {  AlertService } from '../_services/alert.service';
import { Project } from '../_model/project';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  private subscription = new Subscription();
  message: any;
  showLoader: boolean = false;
  public leftNav:boolean = false;
  constructor(private spinnerService: SpinnerService, private alertService: AlertService) { }

  ngOnInit(): void {
   
    this.spinnerService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });

    //var userRoles = ['ROOT','ORG_ADMIN','ORG_ASSOCIATE'];
     var userRole =  localStorage.getItem('orgRole');
     if ( userRole == "ROOT"){
       this.leftNav = true;
     }
    
  }

  newProjectObject(projectObj: Project){
    console.log("Project Object in parent: ",projectObj);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  openNavForRoot(){
    
  }
}
