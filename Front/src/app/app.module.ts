import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainbarComponent } from './mainbar/mainbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ComposeComponent } from './compose/compose.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MailViewComponent } from './mail-view/mail-view.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FolderComponent } from './folder/folder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    MainbarComponent,
    SidebarComponent,
    ComposeComponent,
    LoginComponent,
    SignupComponent,

    MailViewComponent,
      ContactsComponent,
      FolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    RichTextEditorModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'' ,component: LoginComponent},
      {path:'compose/:mail' ,component: ComposeComponent},
      {path:'folder/:name' ,component: FolderComponent},
      {path:'signup' , component: SignupComponent},
      {path:'mail/:id' ,component: MailViewComponent},
      {path:'contacts' ,component: ContactsComponent},
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule, 
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  })
export class AppModule { }

