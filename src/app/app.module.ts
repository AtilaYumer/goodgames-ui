import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HeaderComponent } from './modules/core/header/header.component';
import { JwtInterceptor } from './modules/core/interceptors/jwt.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './modules/core/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { IRootState } from './+store';
import { currentUserReducer } from './+store/reducer';
import { AuthenticationService } from './services/authentication.service';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';
import { AboutComponent } from './modules/core/about/about.component';
import { UsersComponent } from './modules/core/users/users.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AboutComponent,
    UsersComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forRoot<IRootState>({
      currentUser: currentUserReducer
    }, {})
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthenticationService) => {
        return () => authService.authenticate();
      },
      deps: [AuthenticationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
