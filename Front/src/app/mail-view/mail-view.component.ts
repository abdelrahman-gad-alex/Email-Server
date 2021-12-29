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
  xname:any="Hello World"
  constructor(private route:ActivatedRoute,private router: Router, private shared : SharedService, private http:HttpClient,private sanitizer: DomSanitizer) {  }
  importance=0

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
    document.getElementById("mailContent")!.innerHTML = this.mails[foundIdx].mailContent
    this.http.get("http://localhost:8080/controller/getfiles",{
      responseType:'blob',
      params:{
        email: this.shared.getUser(),
        ID: this.id
      },
      observe:'response'
    }).subscribe(response =>{
      //console.log(response)
      this.x2=URL.createObjectURL(response.body!)
      this.x2= <string>this.sanitizer.bypassSecurityTrustUrl(this.x2)
    },(error:HttpErrorResponse) =>{
      console.log(error)
    })  
  }
    //if(this.mails[foundIdx].)
  


  reply(){
    this.router.navigate(['compose',this.from])
  }
}
