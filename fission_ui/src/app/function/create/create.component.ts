import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription, Observable, from } from 'rxjs';
import { Project } from 'src/app/_model/project';
import { FunctionService } from 'src/app/_services/function.service';
import { ProjectService } from 'src/app/_services/project.service';
import { Function } from '../../_model/function';
import { NgbModal, ModalDismissReasons, NgbModule, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  createFunctionForm: FormGroup = this.formBuilder.group({
    functionName: ['', Validators.compose([Validators.maxLength(25),
    Validators.minLength(2),
    Validators.required,
    Validators.pattern('^[a-z0-9_-]+$')])],
    functionImage: ['', Validators.required],
    functionType: [''],
    runtime: ['', Validators.required],
    infraRequirement: ['', Validators.required],
    handlerFileContent: ['', Validators.required],
    dependencyFileContent: ['', Validators.required]
  });



  deployFunctionForm: FormGroup = this.formBuilder.group({
    scaleToZero: ['', Validators.required],
    triggerType: ['', Validators.required],
    topic: ['', Validators.required],
    schedule: ['', Validators.required]
  });

  userId: string = "";
  projectsList: Array<Project> = [];
  isProjectListNull: boolean = false;
  functionAction: string = "";
  projectName: string = "";
  functionName: string = "";
  functionImage: string = "";
  functionRuntimes: any = [];
  infraRequirements: any = [];
  handlerFileName: string = "";
  dependencyFileName: string = "";
  createFunctionFlag: boolean = false;
  alertMsg: string = "";
  userMsg: string = "";
  deployFlag: boolean = false;
  triggerTypes: any = [];
  kafkaFlag: boolean = false;
  cronFlag: boolean = false;
  deployFunctionFlag: boolean = false;
  functionDescription: any = [];
  functionAnnotations: any = [];
  functionLabels: any = [];
  scaleToZeroFlag: boolean = false;
  functionUrl: string = "";
  triggerType: string = "";
  invocationCount: number;
  isFunctionAlreadyDeployed: boolean = false;
  functionBuildLog: string = "";
  createFunctionErrorFlag: boolean = false;
  closeResult: string = "";
  submitted: boolean = false;
  breadcrumb: Array<any> = [];
  functionType: string = "";

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private functionService: FunctionService,
    private router: Router,
    private modalService: NgbModal,
    private alertConfig: NgbAlertConfig,
    private projectService: ProjectService) { }

  ngOnInit(): void {

    this.userId = localStorage.getItem('userId');

    this.createFunctionForm = this.formBuilder.group({
      functionName: ['', Validators.compose([Validators.maxLength(25),
      Validators.minLength(2),
      Validators.required,
      Validators.pattern('^[a-z0-9_-]+$')])],
      functionImage: ['', Validators.required],
      runtime: ['', Validators.required],
      functionType: [''],
      infraRequirement: ['', Validators.required],
      handlerFileContent: ['', Validators.required],
      dependencyFileContent: ['', Validators.required]
    });

    this.createFunctionForm.get('functionType').valueChanges.subscribe(type => {
      this.toggleFields(type);
    });


    this.deployFunctionForm = this.formBuilder.group({
      scaleToZero: ['false', Validators.required],
      triggerType: ['', Validators.required],
      topic: ['', Validators.required],
      schedule: ['', Validators.required]
    });



    this.route.queryParams.subscribe(params => {
      this.functionAction = params['action'];
      this.projectName = params['project'];

      if (this.functionAction == "deployFunction") {
        this.functionName = params['function'];
        this.functionImage = params['function'];
        this.getFunctionParameters();
        this.createFunctionForm.disable();
      }
      this.listProjects();
    });

    this.functionRuntimes = this.getRuntimes();
    console.log("Runtimes:", this.functionRuntimes);
    this.infraRequirements = this.getInfraReq();
    console.log("Runtimes:", this.infraRequirements);
    this.triggerTypes = this.getTriggerTypes();
    console.log("Trigger type:", this.triggerTypes);

    this.breadcrumb = [
      { url: "/projects/home", params: { 'project': this.projectName }, name: 'Home' },
      { url: '', params: '', name: 'Function' }
    ];


  }

  toggleFields(type: string) {
    if (type === 'Code Function') {
      // Enable function fields
      this.createFunctionForm.get('functionName').enable();
      this.createFunctionForm.get('runtime').enable();
      this.createFunctionForm.get('handlerFileContent').enable();
      this.createFunctionForm.get('dependencyFileContent').enable();

      // Disable container fields
      this.createFunctionForm.get('functionImage').disable();
      this.createFunctionForm.get('infraRequirement').disable();
    }

    if (type === 'Container Image') {
      // Disable function fields
      
      this.createFunctionForm.get('runtime').disable();
      this.createFunctionForm.get('handlerFileContent').disable();
      this.createFunctionForm.get('dependencyFileContent').disable();

      // Enable container fields
      this.createFunctionForm.get('functionName').enable();
      this.createFunctionForm.get('functionImage').enable();
      this.createFunctionForm.get('infraRequirement').enable();
    }
  }

  listProjects() {
    console.log("project inside create/deploy: ", this.projectName);
    this.projectService.listProjects(this.userId).subscribe((data: any) => {
      this.projectsList = data;
      if (this.projectsList == null || undefined || this.projectsList.length <= 0) {
        this.isProjectListNull = true;
      }
      else {
        this.isProjectListNull = false;
      }
      console.log("projects List :", this.projectsList);
      let redirect2: boolean = false;
      for (let project of this.projectsList) {
        if (this.projectName == project['projectName']) {
          if (project['projectRoleName'] == "PROJECT_VIEWER") {
            redirect2 = true;
            console.log("Routing to home");
          }
          else if (this.functionAction == "deployFunction") {
            this.functionService.listFunctions(this.projectName).subscribe((data: any) => {
              if (data == undefined || data.length < 0) {

              }
              else {
                let redirect: boolean = false;
                for (let func of data) {
                  if (func['functionName'] == this.functionName) {
                    redirect = true;
                  }
                }
                if (!redirect) {
                  console.log("Routing to home");
                  this.router.navigate(['projects/home'], { queryParams: { project: project['projectName'] } });
                }

              };
            },
              (err: any) => {
                console.log(err);
              })
          }
        }
      }
      if (redirect2) {
        this.router.navigate(['projects/home'], { queryParams: { project: this.projectName } });
      }
    },
      err => {
        console.log(err);
        console.log(err.error.message);
      })
  }



  open(modalObj: string) {
    //this.getFunctionDescription(functionObj);
    this.modalService.open(modalObj, { size: 'lg' }).result.then((result) => {
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

  closeModal() {
    this.functionBuildLog = null;
    this.modalService.dismissAll();
  }

  resetdeployFunctionForm() {
    // this.deployFunctionForm.controls['triggerType'].reset();
    // this.deployFunctionForm.controls['topic'].reset();
    // this.deployFunctionForm.controls['schedule'].reset();
    this.deployFunctionForm.reset();
    //this.initializeFlags();
  }

  newProjectObject(projectObj: Project) {
    console.log("Project Object in parent: ", projectObj);
    if (projectObj == undefined) {
      console.log("Null Projects");
    }
    else {
      console.log("Project Obj", projectObj);
    }
  }

  async getFunctionParameters() {
    this.getFunctionDescription();
    await new Promise(resolve => setTimeout(resolve, 30));
    this.createFunctionFlag = true;
    // this.createFunctionForm.controls['functionType'].setValue(this.functionType);
    this.createFunctionForm.controls['functionType'].setValue(this.functionDescription['functionType']);
    // this.createFunctionForm.controls['functionName'].setValue(this.functionName);
    this.createFunctionForm.controls['functionName'].setValue(this.functionDescription['functionName']);
    // this.createFunctionForm.controls['functionImage'].setValue(this.functionImage);
    this.createFunctionForm.controls['functionImage'].setValue(this.functionDescription['functionImage']);
    this.createFunctionForm.controls['runtime'].setValue(this.functionDescription['runtime']);
    this.createFunctionForm.controls['infraRequirement'].setValue(this.functionDescription['infraRequirement']);
    // console.log("atob", atob(this.functionDescription['handlerFileContent']))
    this.createFunctionForm.controls['handlerFileContent'].setValue(atob(this.functionDescription['handlerFileContent']));
    if (this.functionDescription['dependencyFileContent'] != null || this.functionDescription['dependencyFileContent'] != ' ') {
      this.createFunctionForm.controls['dependencyFileContent'].setValue(atob(this.functionDescription['dependencyFileContent']));
    } else {
      this.createFunctionForm.controls['dependencyFileContent'].setValue('');
      this.createFunctionForm.controls['handlerFileContent'].setValue('');
    }
    //this.createFunctionForm.controls['dependencyFileContent'].setValue('');
    //this.createFunctionForm.controls['handlerFileContent'].setValue('');
    console.log("createFunctionForm", this.createFunctionForm.value);
    console.log("function status", this.functionDescription['functionStatus']);


    this.initializeFunctionFlags();

    switch (this.functionDescription['functionStatus']) {
      case "DEPLOYED":
        this.functionAnnotations = this.functionDescription['annotations'];
        this.functionLabels = this.functionDescription['labels'];
        this.triggerType = this.functionDescription['triggerType'];
        this.functionUrl = this.functionDescription['functionUrl'];
        this.invocationCount = this.functionDescription['invocationCount'];
        if (this.functionLabels != null && this.functionLabels != undefined) {
          this.scaleToZeroFlag = this.functionLabels["com.openfaas.scale.zero"];
        }
        this.isFunctionAlreadyDeployed = true;
        break;
      case "CREATED":
        this.deployFlag = true;
        break;
      case "ERROR":
        this.createFunctionForm.controls['functionName'].disable();
        this.createFunctionForm.controls['runtime'].disable();
        this.createFunctionForm.controls['handlerFileContent'].enable();
        this.createFunctionForm.controls['dependencyFileContent'].enable();
        this.createFunctionFlag = false;
        this.createFunctionErrorFlag = true;
        break;
      case "CREATING":
        this.createFunctionForm.disable();
        this.getFunctionParameters();
        break;
      default:
        break;
    }
  }

  initializeFunctionFlags() {
    this.createFunctionErrorFlag = false;
    this.deployFlag = false;
    this.isFunctionAlreadyDeployed = false;
  }

  getFunctionDescription() {
    var functionObj: Function = new Function();
    functionObj.projectName = this.projectName;
    functionObj.functionName = this.functionName;
    functionObj.functionImage = this.functionImage;
    this.functionService.getFunctionDescription(functionObj).subscribe((data: any) => {
      this.functionDescription = data;
      console.log("functionDescription2 ", this.functionDescription);
    },
      err => {
        //alert("Something Went wrong);
        //this.loginError = true;
        console.log(err);
        console.log(err.error.message);
      })
  }

  getRuntimes() {
    return [
      { id: 'java', name: 'Java' },
      { id: 'go', name: 'GO' },
      { id: 'python', name: 'Python' },
      { id: 'nodejs', name: 'NodeJS' }
    ];
  }

  getInfraReq() {
    return [
      { id: '1vCPU/4GB', name: '1vCPU/4GB' },
      { id: '2vCPU/8GB', name: '2vCPU/8GB' }
    ];
  }

  getTriggerTypes() {
    return [
      { id: 'http', name: 'HTTP Webhook' },
      { id: 'kafka-topic', name: 'Kafka Topic' },
      { id: 'cron-expression', name: 'CRON Trigger' }
    ];
  }

  changeFileNames(event: any) {
    let runtime = event.target.value;
    console.log("Runtime:", runtime);
    switch (runtime) {
      case "java":
        this.handlerFileName = "Handler.java";
        this.dependencyFileName = "build.gradle";
        break;
      case "go":
        this.handlerFileName = "Handler.go";
        this.dependencyFileName = "main.mod";
        break;
      case "python":
        this.handlerFileName = "handler.py";
        this.dependencyFileName = "requirements.txt";
        break;
      case "nodejs":
        this.handlerFileName = "handler.js";
        this.dependencyFileName = "package.json";
        break;
      default:
        break;
    }
    //this.initializeTextAreaFunction(runtime);
  }

  //initializeTextAreaFunction(runtime: string) {
  //	console.log("Textarea", runtime);
  //	switch (runtime) {
  //		case "java17":
  //			this.createFunctionForm.patchValue({
  //					handlerFileContent: atob('cGFja2FnZSBjb20ub3BlbmZhYXMuZnVuY3Rpb247CgppbXBvcnQgY29tLm9wZW5mYWFzLm1vZGVsLklIYW5kbGVyOwppbXBvcnQgY29tLm9wZW5mYWFzLm1vZGVsLklSZXNwb25zZTsKaW1wb3J0IGNvbS5vcGVuZmFhcy5tb2RlbC5JUmVxdWVzdDsKaW1wb3J0IGNvbS5vcGVuZmFhcy5tb2RlbC5SZXNwb25zZTsgICAgICAgCnB1YmxpYyBjbGFzcyBIYW5kbGVyIGV4dGVuZHMgY29tLm9wZW5mYWFzLm1vZGVsLlNhbXBsZUhhbmRsZXIgeyAKICAgICAKICAgICBwdWJsaWMgSVJlc3BvbnNlIEhhbmRsZShJUmVxdWVzdCByZXEpIHsKICAgICAgICAgIFJlc3BvbnNlIHJlcyA9IG5ldyBSZXNwb25zZSgpOwogICAgICAgICAvL3lvdXIgY29kZSBnb2VzIGhlcmUKICAgICAgICAgIHJlcy5zZXRCb2R5KCJIZWxsbywgd29ybGQhIik7ICAgICAgCiAgICAgICAgICByZXR1cm4gcmVzOwogICAgICAgIH0KCn0='),
  //				dependencyFileContent: atob('cGx1Z2lucyB7CiAgICAvLyBBcHBseSB0aGUgamF2YS1saWJyYXJ5IHBsdWdpbiB0byBhZGQgc3VwcG9ydCBmb3IgSmF2YSBMaWJyYXJ5CiAgICBpZCAnamF2YS1saWJyYXJ5JwogICAgaWQgJ2Rpc3RyaWJ1dGlvbicKfQoKZGVwZW5kZW5jaWVzIHsKICAgIC8vIFRoaXMgZGVwZW5kZW5jeSBpcyBleHBvcnRlZCB0byBjb25zdW1lcnMsIHRoYXQgaXMgdG8gc2F5IGZvdW5kIG9uIHRoZWlyIGNvbXBpbGUgY2xhc3NwYXRoLgogICAgYXBpICdvcmcuYXBhY2hlLmNvbW1vbnM6Y29tbW9ucy1tYXRoMzozLjYuMScKCiAgICAvLyBUaGlzIGRlcGVuZGVuY3kgaXMgdXNlZCBpbnRlcm5hbGx5LCBhbmQgbm90IGV4cG9zZWQgdG8gY29uc3VtZXJzIG9uIHRoZWlyIG93biBjb21waWxlIGNsYXNzcGF0aC4KICAgIGltcGxlbWVudGF0aW9uICdjb20uZ29vZ2xlLmd1YXZhOmd1YXZhOjIzLjAnCgogICAgLy8gVXNlIEpVbml0IHRlc3QgZnJhbWV3b3JrCiAgICB0ZXN0SW1wbGVtZW50YXRpb24gJ2p1bml0Omp1bml0OjQuMTInCgogICAgY29tcGlsZSAnY29tLm9wZW5mYWFzOm1vZGVsOjAuMS4xJwogICAgY29tcGlsZSAnY29tLm9wZW5mYWFzOmVudHJ5cG9pbnQ6MC4xLjAnCn0KCi8vIEluIHRoaXMgc2VjdGlvbiB5b3UgZGVjbGFyZSB3aGVyZSB0byBmaW5kIHRoZSBkZXBlbmRlbmNpZXMgb2YgeW91ciBwcm9qZWN0CnJlcG9zaXRvcmllcyB7CiAgICAvLyBVc2UgamNlbnRlciBmb3IgcmVzb2x2aW5nIHlvdXIgZGVwZW5kZW5jaWVzLgogICAgLy8gWW91IGNhbiBkZWNsYXJlIGFueSBNYXZlbi9JdnkvZmlsZSByZXBvc2l0b3J5IGhlcmUuCiAgICBqY2VudGVyKCkKCiAgICBmbGF0RGlyIHsKICAgICAgICBkaXJzICcuLi9saWJzJwogICAgfQp9CgpqYXIgewogICAgbWFuaWZlc3QgewogICAgICAgIGF0dHJpYnV0ZXMgJ0ltcGxlbWVudGF0aW9uLVRpdGxlJzogJ09wZW5GYWFTIEZ1bmN0aW9uJywKICAgICAgICAgICAgICAgICAgICdJbXBsZW1lbnRhdGlvbi1WZXJzaW9uJzogJzEuMCcKICAgIH0KfQoKCmRpc3RyaWJ1dGlvbnMgewogICAgbWFpbiB7CiAgICAgICAgY29udGVudHMgewogICAgICAgICAgICBmcm9tIGphcgogICAgICAgICAgICBpbnRvKCdsaWInKSB7CiAgICAgICAgICAgICAgICBmcm9tKHByb2plY3QuY29uZmlndXJhdGlvbnMucnVudGltZSkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KfQoKdXBsb2FkQXJjaGl2ZXMgewogICAgcmVwb3NpdG9yaWVzIHsKICAgICAgIGZsYXREaXIgewogICAgICAgICAgIGRpcnMgJ3JlcG9zJwogICAgICAgfQogICAgfQp9'),
  //        });
  //			break;
  //		case "dotnet8-csharp": this.createFunctionForm.patchValue({
  //				handlerFileContent: atob('dXNpbmcgTWljcm9zb2Z0LkFzcE5ldENvcmUuQnVpbGRlcjsKdXNpbmcgTWljcm9zb2Z0LkFzcE5ldENvcmUuSHR0cDsKdXNpbmcgTWljcm9zb2Z0LkV4dGVuc2lvbnMuRGVwZW5kZW5jeUluamVjdGlvbjsKCm5hbWVzcGFjZSBmdW5jdGlvbjsKCnB1YmxpYyBzdGF0aWMgY2xhc3MgSGFuZGxlcgp7CiAgICAvLyBNYXBFbmRwb2ludHMgaXMgdXNlZCB0byByZWdpc3RlciBXZWJBcHBsaWNhdGlvbgogICAgLy8gSFRUUCBoYW5kbGVycyBmb3IgdmFyaW91cyBwYXRocyBhbmQgSFRUUCBtZXRob2RzLgogICAgcHVibGljIHN0YXRpYyB2b2lkIE1hcEVuZHBvaW50cyhXZWJBcHBsaWNhdGlvbiBhcHApCiAgICB7CiAgICAgICAgYXBwLk1hcEdldCgiLyIsICgpID0+CiAgICAgICAgewogICAgICAgICAgICByZXR1cm4gIkhlbGxvIGZyb20gT3BlbkZhYVMuIjsKICAgICAgICB9KTsKICAgIH0KCiAgICAvLyBNYXBTZXJ2aWNlcyBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgYWRkaXRpb25hbAogICAgLy8gV2ViQXBwbGljYXRpb24gc2VydmljZXMKICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYXBTZXJ2aWNlcyhJU2VydmljZUNvbGxlY3Rpb24gc2VydmljZXMpCiAgICB7CiAgICB9Cn0K'),
  //				dependencyFileContent: atob('PFByb2plY3QgU2RrPSJNaWNyb3NvZnQuTkVULlNkayI+CgogIDxQcm9wZXJ0eUdyb3VwPgogICAgPFRhcmdldEZyYW1ld29yaz5uZXQ4LjA8L1RhcmdldEZyYW1ld29yaz4KICAgIDxJbXBsaWNpdFVzaW5ncz5lbmFibGU8L0ltcGxpY2l0VXNpbmdzPgogICAgPE51bGxhYmxlPmVuYWJsZTwvTnVsbGFibGU+CiAgPC9Qcm9wZXJ0eUdyb3VwPgoKICA8SXRlbUdyb3VwPgogICAgPEZyYW1ld29ya1JlZmVyZW5jZSBJbmNsdWRlPSJNaWNyb3NvZnQuQXNwTmV0Q29yZS5BcHAiIC8+CiAgPC9JdGVtR3JvdXA+Cgo8L1Byb2plY3Q+Cg==')
  //			break;
  //		case "python3-flask": this.createFunctionForm.patchValue({
  //				handlerFileContent: atob('ZGVmIGhhbmRsZShyZXEpOgogICAgIiIiaGFuZGxlIGEgcmVxdWVzdCB0byB0aGUgZnVuY3Rpb24KICAgIEFyZ3M6CiAgICAgICAgcmVxIChzdHIpOiByZXF1ZXN0IGJvZHkKICAgICIiIgoKICAgIHJldHVybiByZXE='),
  //				dependencyFileContent: atob('bnVtcHkKcGFuZGFz') 
  //      })
  //			break;
  //		case "node18":
  //			this.createFunctionForm.patchValue({
  //					handlerFileContent: atob('J3VzZSBzdHJpY3QnCgptb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChldmVudCwgY29udGV4dCkgPT4gewogIGNvbnN0IHJlc3VsdCA9IHsKICAgICdzdGF0dXMnOiAnUmVjZWl2ZWQgaW5wdXQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5ib2R5KQogIH0KCiAgcmV0dXJuIGNvbnRleHQKICAgIC5zdGF0dXMoMjAwKQogICAgLnN1Y2NlZWQocmVzdWx0KQp9'),
  //				dependencyFileContent: atob('ewogICJuYW1lIjogIm9wZW5mYWFzLW5vZGUxMiIsCiAgInZlcnNpb24iOiAiMS4wLjAiLAogICJkZXNjcmlwdGlvbiI6ICIiLAogICJtYWluIjogImluZGV4LmpzIiwKICAic2NyaXB0cyI6IHsKICAgICJ0ZXN0IjogImVjaG8gXCJFcnJvcjogbm8gdGVzdHMgc3BlY2lmaWVkXCIgJiYgZXhpdCAwIgogIH0sCiAgImtleXdvcmRzIjogW10sCiAgImF1dGhvciI6ICJPcGVuRmFhUyBMdGQiLAogICJsaWNlbnNlIjogIk1JVCIsCiAgImRlcGVuZGVuY2llcyI6IHsKICAgICJib2R5LXBhcnNlciI6ICJeMS4xOC4yIiwKICAgICJleHByZXNzIjogIl40LjE2LjIiCiAgfQp9')
  //        });
  //			break;
  //		default:
  //			break;
  //    }
  //	}
  //}


  get f() {
    return this.createFunctionForm.controls;
  }

  createFunction() {
    this.submitted = true;
    //if(this.createFunctionForm.invalid){
    //console.log("Invalid form",this.f.runtime.errors);
    //return;
    //}
    this.createFunctionErrorFlag = false;
    this.functionBuildLog = "";
    var functionObj: Function = new Function();
    functionObj.projectName = this.projectName;
    functionObj.functionType = this.createFunctionForm.controls['functionType'].value;
    functionObj.functionName = this.createFunctionForm.controls['functionName'].value;
    functionObj.functionImage = this.createFunctionForm.controls['functionImage'].value;
    functionObj.runtime = this.createFunctionForm.controls['runtime'].value;
    functionObj.infraRequirement = this.createFunctionForm.controls['infraRequirement'].value;
    functionObj.handlerFileContent = btoa(this.createFunctionForm.controls['handlerFileContent'].value);
    functionObj.dependencyFileContent = btoa(this.createFunctionForm.controls['dependencyFileContent'].value);
    functionObj.handlerFileName = this.handlerFileName;
    functionObj.dependencyFileName = this.dependencyFileName;
    this.functionName = this.createFunctionForm.controls['functionName'].value;
    console.log("functionObj:", functionObj);
    this.createFunctionFlag = true;
    this.userMsg = "creating function... This will take some time."
    this.functionService.createFunction(functionObj).subscribe((data: any) => {
      console.log(data);
      this.userMsg = null;
      this.deployFlag = true;
      this.alertMsg = data['message'];
      this.alertConfigurations("success");

    },
      err => {
        this.userMsg = null;
        this.submitted = false;
        this.createFunctionErrorFlag = true;
        this.createFunctionFlag = false;
        console.log(err);
        this.alertConfigurations("danger");
        this.alertMsg = err.error.message;
      })
  }

  viewErrorLog() {
    console.log("Function name: ", this.functionName);
    var functionObj: Function = new Function();
    functionObj.projectName = this.projectName;
    functionObj.functionName = this.functionName;
    this.functionService.getFunctionBuildLog(functionObj).subscribe((data: any) => {
      console.log("Encrypted data:", data);
      let encrytedData = atob(data);
      this.functionBuildLog = encrytedData;
    },
      err => {
        console.log("Error msg:", err);
        console.log(err.error.message);
      })

  }

  changeTriggerType(event: any) {
    let triggerType = event.target.value;
    this.initializeFlags();
    console.log("Trigger Type:", triggerType);
    switch (triggerType) {
      case "kafka-topic":
        this.kafkaFlag = true;
        break;
      case "cron-expression":
        this.cronFlag = true;
        break;
      default:
        break;
    }
  }

  initializeFlags() {
    this.kafkaFlag = false;
    this.cronFlag = false;
  }

  deployFunction() {
    console.log("Deploy form: ", this.deployFunctionForm.value);
    var functionObj: Function = new Function();
    functionObj.projectName = this.projectName;
    functionObj.functionName = this.functionName;
    functionObj.labels = {};
    functionObj.labels["com.openfaas.scale.zero"] = this.deployFunctionForm.controls['scaleToZero'].value;
    functionObj.triggerType = this.deployFunctionForm.controls['triggerType'].value;
    functionObj.annotations = {};
    switch (functionObj.triggerType) {
      case "kafka-topic":
        functionObj.annotations["topic"] = this.deployFunctionForm.controls['topic'].value;
        break;
      case "cron-expression":
        functionObj.annotations["schedule"] = this.deployFunctionForm.controls['schedule'].value;
        break;
      default:
        break;
    }
    console.log("labelObj:", functionObj.labels);
    console.log("annotationsObj:", functionObj.annotations);
    console.log("functionObj:", JSON.stringify(functionObj));
    this.functionService.deployFunction(functionObj).subscribe((data: any) => {
      this.deployFunctionFlag = true;
      console.log(data);
      this.modalService.dismissAll();
      this.getFunctionParameters();
      this.isFunctionAlreadyDeployed = true;
      this.alertMsg = data['message'];
      this.alertConfigurations("success");
    },
      err => {
        //alert("Something Went wrong);
        //this.loginError = true;
        console.log(err);
        this.modalService.dismissAll();
        this.alertMsg = err.error.message;
        this.alertConfigurations("danger");
      })

  }

  alertConfigurations(type: string) {
    this.alertConfig.type = type;
  }

}
