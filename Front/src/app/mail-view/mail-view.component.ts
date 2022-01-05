import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.css']
})
export class MailViewComponent implements OnInit {
  id=0;
  from="";
  to :string[]=[];
  subject="";
  mails=this.shared.getMails()
  x2:any
  count:number=0
  xname:any="Hello World"
  constructor(private route:ActivatedRoute,private router: Router, private shared : SharedService, private http:HttpClient,private sanitizer: DomSanitizer) {  }
  importance=0
  temp2:string[]=[]
  temp3:string=""
  temp:string[]=[]
  attachedFile:string[]=[]
  attachedFileURL:string[]=[]
  names:any[]=[];
  ngOnInit(): void {
    let id =+this.route.snapshot.paramMap.get('id')!;
    this.id=id;
    let foundIdx : number = -1
    for(let i =0; i < this.mails.length; i++)
    {
      if(this.mails[i].id == this.id)
      {
        foundIdx = i
        console.log("found")
        console.log(this.mails[i].mailContent)
        break
      }
    }
    // console.log(this.mails)
    this.from = this.mails[foundIdx].from
    this.to= this.mails[foundIdx].to
    this.subject=this.mails[foundIdx].subject
    this.importance=this.mails[foundIdx].importance
    this.temp=this.shared.getMails()[foundIdx].file
    console.log(this.temp)
    
    document.getElementById("mailContent")!.innerHTML = this.mails[foundIdx].mailContent
    console.log(this.temp)
    if(this.temp!= null){
      for (let  i=0;i< this.temp.length;i++){
        if(this.temp[i]!="," && this.temp[i]!='"' && this.temp[i]!="[" && this.temp[i]!="]")
        { 
          console.log(this.temp[i])
            this.temp3=this.temp3+this.temp[i]
        }
        else
        {
          console.log(this.temp3)
          this.temp2.push(this.temp3);
          this.temp3=""
        
        }

      }
    }
    console.log(this.temp2.length)
      for(let i of this.temp2){
        if (i!=""){
          this.attachedFile.push(i)
        }
      }
      console.log(this.attachedFile)
      for(let i of this.attachedFile){

        this.http.get("http://localhost:8080/controller/getfiles",{
      responseType:'blob',
      params:{
        fileName: i
      },
      observe:'response'
    }).subscribe(response =>{
      this.x2=URL.createObjectURL(response.body!)
      this.x2= <string>this.sanitizer.bypassSecurityTrustUrl(this.x2)
      this.attachedFileURL.push(this.x2)
    },(error:HttpErrorResponse) =>{
      console.log(error)
    })  
  }

    //if(this.mails[foundIdx].)
  
  }

  reply(){
    this.router.navigate(['compose',this.from])
  }
}
