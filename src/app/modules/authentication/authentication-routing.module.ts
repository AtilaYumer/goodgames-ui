import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from '../core/guard/guest.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [GuestGuard],
    component: RegisterComponent
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: LoginComponent
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
