import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
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
  str='<h1 style="text-decoration: underline; text-align: center;"><em>adwadw</em></h1><ol><li><span style="text-decoration: underline;"><strong>Mento Is herree</strong></span></li><li><span style="text-decoration: underline;"><strong>adwhawfo</strong></span></li><li><span style="text-decoration: underline;"><strong>awfda</strong></span></li><li><span style="text-decoration: underline;"><strong>ewf</strong></span></li><li><span style="text-decoration: underline;"><strong>re</strong></span></li><li><span style="text-decoration: underline;"><strong>asf</strong></span></li><li><span style="text-decoration: underline;"><strong>ewfaef</strong></span></li><li><span style="text-decoration: underline;"><strong>wad</strong></span></li><li><span style="text-decoration: underline;"><strong>﻿﻿<br></strong></span></li></ol><p _ngcontent-vwx-c60=""></p>'

  constructor(private route:ActivatedRoute,private router: Router) {  
    
  }

  ngOnInit(): void {
    let id =+this.route.snapshot.paramMap.get('id')!;
    this.id=id;
    var result = this.mails.filter(obj => {
      return obj.id === this.id
    })
    this.from=result[0].from
    this.to=result[0].to
    this.subject=result[0].subject
    
    document.getElementById("mailContent")!.innerHTML=this.str
  }

  reply(){
    this.router.navigate(['compose',this.from])
  }
}
