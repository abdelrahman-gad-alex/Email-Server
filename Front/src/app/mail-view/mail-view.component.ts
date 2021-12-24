import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { MAILS } from '../inboxMail';
@Component({
  selector: 'app-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.css']
})
export class MailViewComponent implements OnInit {
  id=0;
  from="";
  to="";
  subject="";
  mails=MAILS
  constructor(private route:ActivatedRoute) {  
    
  }

  ngOnInit(): void {
    let id =+this.route.snapshot.paramMap.get('id')!;
    this.id=id;
    this.from=this.mails[this.id].from
    this.to=this.mails[this.id].to
    this.subject=this.mails[this.id].subject
  }

}
