import { Component, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

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
  importance :number=0;
  httpClient: any;
  back(): void {
    this.location.back()
  }
  constructor(private location: Location, private route:ActivatedRoute ,private sanitizer: DomSanitizer) { 
    this.importance=2;
  }

  ngOnInit(): void {
    let mail =this.route.snapshot.paramMap.get('mail')!;
    if (mail!="none")
      this.to=mail
    }

  submit(){
    console.log(this.importance)
  }
  attachedFile:File[]=[]
  attachedFileName:String[]=[]
  attachedFileUrl:any[]=[]
  c=0
  x1:any
  select(event: any){
    this.attachedFile.push(<File>event.target.files[0] )
    this.attachedFileName.push(event.target.files[0].name)
    this.x1=URL.createObjectURL(<File>event.target.files[0])
    this.c++;
    this.x1= <string>this.sanitizer.bypassSecurityTrustUrl(this.x1)
    this.attachedFileUrl.push(this.x1)
  
  }
  remove(i:number){
    this.attachedFile.splice(i,1)
    this.attachedFileName.splice(i,1)
    this.attachedFileUrl.splice(i,1)
    this.x1=""
  }

}
