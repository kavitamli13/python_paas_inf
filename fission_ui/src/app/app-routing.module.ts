import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { LoginComponent } from './authlayout/login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { RootComponent } from './root/root.component';
import { LayoutComponent } from './layout/layout.component';
import { ConfigurationComponent } from './root/configuration/configuration.component';
import { UsersComponent } from './root/users/users.component';
import { ManageComponent } from './projects/manage/manage.component';
import { UsageComponent } from './projects/usage/usage.component';
import { FunctionComponent } from './function/function.component';
import { CreateComponent } from './function/create/create.component';
import { LogsComponent } from './function/logs/logs.component';
import { DeployComponent } from './function/deploy/deploy.component';
import { ProjectHomeComponent } from './projects/project-home/project-home.component';


const routes: Routes = [

  {
    path: 'auth',
    component: AuthlayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      { path: 'manage', component: ManageComponent },
      { path: 'usage', component: UsageComponent },
      { path: 'home', component: ProjectHomeComponent},
      { path: 'function', component: CreateComponent },
       { path: 'function/logs', component: LogsComponent }
    ]
   
  },
  // { path: 'projects/home', component: ManageComponent },
  
  {
    path: 'root', component: RootComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'configuration', component: ConfigurationComponent }
    ]
  },
  // { path: 'function/create', component: CreateComponent },
  // { path: 'function/logs', component: LogsComponent },
  // {
  //   path: 'function',
  //   component: FunctionComponent,
  //   children: [
  //     //{ path: 'logs', component: LogsComponent },
  //     //{ path: 'create', component: CreateComponent}
  //   ]
   
  // },
  
  {
    path: '',
    component: LayoutComponent
  },
  { path: '**' , redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload',useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
