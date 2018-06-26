import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownService } from './dropdown.service';
import { RoleComponent } from './role/role.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes : Routes = [
  { path : '', component : UsersComponent},
  { path : 'role', component : RoleComponent},
  { path : '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RoleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ DropdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
