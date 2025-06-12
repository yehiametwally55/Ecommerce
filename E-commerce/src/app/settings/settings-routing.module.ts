import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'', redirectTo: 'reset', pathMatch: 'full'},
  {path:'reset' ,component: ResetPasswordComponent},
  {path:'forget' ,component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
