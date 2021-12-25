import { Component, Injectable, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { map } from 'rxjs';
import { Mail } from '../mail';

@Injectable({
  providedIn: 'root' 
})
@Component({ 
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})

  export class ComposeComponent implements OnInit {
    public tools: object = {
      items: ['Undo', 'Redo', '|',
          'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
          'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
          'SubScript', 'SuperScript', '|',
          'LowerCase', 'UpperCase', '|',
          'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
          'Indent', 'Outdent', '|', 'CreateLink',
          'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
x:String="";

  to!: String;
  public iframe: object = { enable: true };
  public height: number = 500;
  faPaperclip=faPaperclip
  toText:string = ""
  subjectText:string = ""
  conText:string = ""
  // Text:string = ""
  back(): void {
    this.location.back()
  }
  constructor(private location: Location, private route:ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
    let mail =this.route.snapshot.paramMap.get('mail')!;
    if (mail!="none")
      this.to=mail
  }
  submit(){
    console.log(this.toText)
    console.log(this.subjectText)
    console.log(this.conText)
    // let mail = new Map();
    // mail.set("to", this.toText)
    // mail.set("from", "omar@gmail.com")
    // mail.set("importance", 1)
    // mail.set('date', new Date())
    // mail.set('mailContent', this.conText)
    // mail.set('subject', this.subjectText)
    let cMail !: Mail; 
    cMail.from =  "omar@gmail.com"
    cMail.to = this.toText
    cMail.subject = this.subjectText
    cMail.id = -1
    cMail.importance = 1
    cMail.mailContent = this.conText
    let temp = new Date()
    cMail.time = temp.toDateString()
     this.http.post("http://localhost:8080/controller/sendEmail",
     {
       email:cMail,
       observe:'response'
     }
     
     ).subscribe(response=>{
       let a;
       a=response
     })
   
  
  }
}
function observe(arg0: string, arg1: { email: Mail; }, observe: any, arg3: string) {
  throw new Error('Function not implemented.');
}

