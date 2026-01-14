import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { LoginComponent } from './authlayout/login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { RootComponent } from './root/root.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/common/header/header.component';
import { FooterComponent } from './layout/common/footer/footer.component';
import { LeftsidenavComponent } from './layout/common/leftsidenav/leftsidenav.component';
import { UsersComponent } from './root/users/users.component';
import { ConfigurationComponent } from './root/configuration/configuration.component';
import { ManageComponent } from './projects/manage/manage.component';
import { FunctionComponent } from './function/function.component';
import { CreateComponent } from './function/create/create.component';
import { UsageComponent } from './projects/usage/usage.component';
import { LogsComponent } from './function/logs/logs.component';
import { DeployComponent } from './function/deploy/deploy.component';
import { ProjectHeaderComponent } from './layout/common/project-header/project-header.component';
import { ProjectHomeComponent } from './projects/project-home/project-home.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthlayoutComponent,
    LoginComponent,
    ProjectsComponent,
    RootComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LeftsidenavComponent,
    UsersComponent,
    ConfigurationComponent,
    ManageComponent,
    FunctionComponent,
    CreateComponent,
    UsageComponent,
    LogsComponent,
    DeployComponent,
    ProjectHeaderComponent,
    ProjectHomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
