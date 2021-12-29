import { Component, Injectable, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs';
import { Mail } from '../mail';
import { SharedService } from '../shared/shared.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Ifolders } from '../Ifolders';
import { Icontacts } from '../Icontacts';
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
  res!: any;
  to!: String;
  public iframe: object = { enable: true };
  public height: number = 500;
  faPaperclip=faPaperclip
  toText:string = ""
  subjectText:string = ""
  conText:string = ""
  importance :number=1;
  // Text:string = ""
  back(): void {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.cMail2 = new mailing(this.shared.getUser(), this.to.split(','), this.subjectText, this.conText, this.temp2.toDateString(), this.importance ,this.attachedFileName); 
    this.sendmail2(this.cMail2).subscribe(res =>{
      console.log(res)
      this.http.get("http://localhost:8080/controller/login",{
      responseType:'text',
      params:{
          email: this.shared.getUser(),
          password: this.shared.getPass()
      },
      observe:'response'
    })
    .subscribe(response=>{      
          
      try
      {
        console.log(response.body)
        this.res=JSON.parse(<string>response.body)
        console.log(this.res)
        let tempArr = this.res.folders
        let tempName !: string
        let folders: Ifolders[] = []
        let contacts: Icontacts[] = []
        let mails: Mail[] = []
        for(let i =0; i < tempArr.length; i++)
        {
          let temp : Ifolders = new Ifolders(tempArr[i].name, tempArr[i].id.reverse())
          folders.push(temp)
        }
        tempArr = this.res.contacts
        for(let i =0; i < tempArr.length; i++)
        {
          let temp : Icontacts = new Icontacts()
          temp.mail = tempArr[i].nameValuePairs.emails
          temp.name = tempArr[i].nameValuePairs.name
          contacts.push(temp)
        }
        tempArr = this.res.mails
        for(let i =0; i < tempArr.length; i++)
        {
          let temp : Mail = new Mail()
          temp.id = tempArr[i].massageMap.id
          temp.time = tempArr[i].massageMap.time
          temp.from = tempArr[i].massageMap.from
          temp.importance = tempArr[i].massageMap.importance
          temp.to = tempArr[i].massageMap.to
          temp.subject = tempArr[i].massageMap.subject
          temp.mailContent = tempArr[i].massageMap.mailContent
          temp.file = tempArr[i].massageMap.file
          mails.push(temp)
          // console.log(temp)
        }
        this.shared.setContacts(contacts)
        this.shared.setFolders(folders)
        this.shared.setMails(mails)
        // this.shared.setUser(this.myText)
        // this.route.navigate(['folder',"inbox"])
        this.router.navigate([currentUrl]);
        this.router.navigate(['folder',"draft"]);
      }
      catch(e)
      {
        alert("Wrong Email or Wrong Password!!")
      }
    })
      
})
  }
  sendmail2(email: mailing):Observable<HttpEvent<any>>
  {
    console.log(email)
    return this.http.post<any>("http://localhost:8080/controller/draftEmail",email)
 

  }
  constructor(private location: Location, private router: Router,  private shared:SharedService,private route:ActivatedRoute, private http:HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let mail =this.route.snapshot.paramMap.get('mail')!;
    if (mail!="none")
      this.to=mail
      console.log(this.shared.getFolders())

  }
  sendmail(email: mailing):Observable<HttpEvent<any>>
  {
    console.log(email)

    return this.http.post<any>("http://localhost:8080/controller/sendEmail",email)
  }
  temp = new Date()
  temp2 = new Date()
  cMail !: mailing;
  cMail2 !: mailing;
  // cMail = 
  submit(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    console.log(this.to)
    console.log(this.subjectText)
    console.log(this.conText)
    let temp = new Date()
    this.cMail = new mailing(this.shared.getUser(), this.to.split(','), this.subjectText, this.conText, temp.toDateString(), this.importance ,this.attachedFileName); 
    let res !: any
    let resp !: any
    this.sendmail(this.cMail).subscribe(temp =>
    {
       res = temp
       console.log(res)
       if (res=="done"&&this.attachedFile.length){
        const fd=new FormData()
        for (let file of this.attachedFile){
        fd.append('file',file)
        }

        this.http.post<any>("http://localhost:8080/controller/sendfile",fd).subscribe(tem=>{
 
          console.log(tem)
        })
        
        
       }
       ///////////////////////////
      
       this.http.get("http://localhost:8080/controller/login",{
     responseType:'text',
     params:{
         email: this.shared.getUser(),
         password: this.shared.getPass()
     },
     observe:'response'
   })
   .subscribe(response=>{      
         
     try
     {
       console.log(response.body)
       var ss=JSON.parse(<string>response.body)
       console.log(ss)
       let tempArr = ss.folders
       let tempName !: string
       let folders: Ifolders[] = []
       let contacts: Icontacts[] = []
       let mails: Mail[] = []
       for(let i =0; i < tempArr.length; i++)
       {
         let temp : Ifolders = new Ifolders(tempArr[i].name, tempArr[i].id.reverse())
         folders.push(temp)
       }
       tempArr = ss.contacts
       for(let i =0; i < tempArr.length; i++)
       {
         let temp : Icontacts = new Icontacts()
         temp.mail = tempArr[i].nameValuePairs.emails
         temp.name = tempArr[i].nameValuePairs.name
         contacts.push(temp)
       }
       tempArr = ss.mails
       for(let i =0; i < tempArr.length; i++)
       {
         let temp : Mail = new Mail()
         temp.id = tempArr[i].massageMap.id
         temp.time = tempArr[i].massageMap.time
         temp.from = tempArr[i].massageMap.from
         temp.importance = tempArr[i].massageMap.importance
         temp.to = tempArr[i].massageMap.to
         temp.subject = tempArr[i].massageMap.subject
         temp.mailContent = tempArr[i].massageMap.mailContent
        //  temp.file = tempArr[i].massageMap.file
         mails.push(temp)
         // console.log(temp)
       }
       this.shared.setContacts(contacts)
       this.shared.setFolders(folders)
       this.shared.setMails(mails)
       // this.shared.setUser(this.myText)
       this.router.navigate([currentUrl]);
       this.router.navigate(['folder',"sent"]);

     }
     catch(e)
     {
       alert("Wrong Email")
     }
   })






   









  })

  
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

file64:string=""

}



class mailing
{
  from!: string;
  to!: string[];
  subject!: string;
  mailContent!:string;
  time!: string;
  importance!:number;
  file!:String[];
  constructor(a:string, b: string[], c: string, d: string, e: string,f: number,g:String[])
  {
    this.from = a
    this.to = b
    this.subject = c
    this.mailContent = d
    this.time = e
    this.importance = f
    this.file= g
  }
  
}