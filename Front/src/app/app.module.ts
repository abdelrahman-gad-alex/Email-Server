import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InboxComponent } from './inbox/inbox.component';
import { MainbarComponent } from './mainbar/mainbar.component';
import { StarredComponent } from './starred/starred.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ComposeComponent } from './compose/compose.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
=======
import { MailViewComponent } from './mail-view/mail-view.component';
>>>>>>> 54ae62fde33c8e982c1992ecca5bd23f7ff86588

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    MainbarComponent,
    StarredComponent,
    SidebarComponent,
    ComposeComponent,
<<<<<<< HEAD
    LoginComponent,
    SignupComponent,

=======
    MailViewComponent
>>>>>>> 54ae62fde33c8e982c1992ecca5bd23f7ff86588
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
      {path:'starred' ,component: StarredComponent},
      {path:'compose' ,component: ComposeComponent},
<<<<<<< HEAD
      {path:'signup' , component: SignupComponent}
=======
      {path:'mail' ,component: MailViewComponent}
>>>>>>> 54ae62fde33c8e982c1992ecca5bd23f7ff86588
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  })
export class AppModule { }

