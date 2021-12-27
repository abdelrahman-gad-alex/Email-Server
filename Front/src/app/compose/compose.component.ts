import { Component, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  constructor(private location: Location, private route:ActivatedRoute) { 
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
  attachedFileName:String[]=[""]

  select(event: any){
    this.attachedFile.push(<File>event.target.files[0] )
    this.attachedFileName.push(this.attachedFile[this.attachedFile.length-1].name)
    console.log(this.attachedFile)
    var x=URL.createObjectURL(event.target.files[0])
    document.getElementById("img"+(this.attachedFile.length-1))!.style.display="block"
    document.getElementById("img"+(this.attachedFile.length-1))!.setAttribute("src",x)
  
  }
  remove(i:number){
    document.getElementById("img"+i)!.setAttribute("src","#")
    document.getElementById("img"+i)!.style.display="none"
    this.attachedFile.splice(i,1)
    this.attachedFileName.splice(i,1)
    console.log(i)
  }

}
