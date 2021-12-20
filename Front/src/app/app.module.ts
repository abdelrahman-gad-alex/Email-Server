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

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    MainbarComponent,
    StarredComponent,
    SidebarComponent,
    ComposeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RichTextEditorModule,
    RouterModule.forRoot([
      {path:'' ,component: InboxComponent},
      {path:'starred' ,component: StarredComponent},
      {path:'compose' ,component: ComposeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  })
export class AppModule { }

