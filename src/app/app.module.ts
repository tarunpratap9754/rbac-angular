import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { PageProvider } from './page-provider';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownService } from './dropdown.service';
import { RoleComponent } from './role/role.component';
import { Routes, RouterModule } from '@angular/router';
import { MockViewComponent } from './mock-view/mock-view.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


export function tokenGetter() {
  return localStorage.getItem('id_token');
}

const appRoutes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'role', component: RoleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view', component: MockViewComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

export function pageProviderFactory(provider: PageProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RoleComponent,
    MockViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [''],
        blacklistedRoutes: ['']
      }
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      maxOpened: 3,
      //preventDuplicates: true,
      //progressBar: true,
      //progressAnimation: "increasing",
      autoDismiss: true
    })
  ],
  providers: [DropdownService, PageProvider,
    { provide: APP_INITIALIZER, useFactory: pageProviderFactory, deps: [PageProvider], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
