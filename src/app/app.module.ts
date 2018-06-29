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

const appRoutes : Routes = [
  { path : '', component : UsersComponent},
  { path : 'role', component : RoleComponent},
  { path : 'view', component : MockViewComponent},
  { path : '**', redirectTo: '', pathMatch: 'full' }
]

export function pageProviderFactory(provider: PageProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RoleComponent,
    MockViewComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ DropdownService, PageProvider, 
    { provide: APP_INITIALIZER, useFactory: pageProviderFactory, deps: [PageProvider], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
