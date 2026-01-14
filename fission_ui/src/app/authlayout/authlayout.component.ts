import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../_services/spinner.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-authlayout',
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss']
})
export class AuthlayoutComponent implements OnInit {

  private subscription = new Subscription();
  message: any;
  showLoader: boolean = false;
  constructor(private spinnerService: SpinnerService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.spinnerService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
