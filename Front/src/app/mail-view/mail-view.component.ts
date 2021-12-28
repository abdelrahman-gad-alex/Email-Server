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
    var result = this.mails.filter(obj => {
      return obj.id === this.id
    })
    console.log(this.mails)
    this.from=result[0].from
    this.to=result[0].to
    this.subject=result[0].subject
    
    document.getElementById("mailContent")!.innerHTML=result[0].mailContent
  }

  reply(){
    this.router.navigate(['compose',this.from])
  }
}
