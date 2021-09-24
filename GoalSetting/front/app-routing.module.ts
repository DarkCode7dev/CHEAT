import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HelpComponent } from './help/help.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '',  redirectTo:'login',pathMatch:'full' },
  {path: 'login', component: LoginComponent},
  {path: 'list', component: ListComponent , canActivate:[AuthGuard]},
  {path: 'help', component: HelpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
