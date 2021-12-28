import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { MAILS } from '../inboxMail';
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

  constructor(private route:ActivatedRoute,private router: Router, private shared : SharedService) {  
    
  }

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
    
    document.getElementById("mailContent")!.innerHTML = this.mails[foundIdx].mailContent
  }

  reply(){
    this.router.navigate(['compose',this.from])
  }
}
