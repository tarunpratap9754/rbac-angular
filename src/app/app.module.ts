import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { PageProvider } from './page-provider';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownService } from './dropdown.service';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';

export function pageProviderFactory(provider: PageProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RolesComponent,
    RoleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ DropdownService, PageProvider, 
    { provide: APP_INITIALIZER, useFactory: pageProviderFactory, deps: [PageProvider], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
