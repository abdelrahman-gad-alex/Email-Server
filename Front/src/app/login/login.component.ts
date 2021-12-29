import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {Router} from '@angular/router';
import { Ifolders } from '../Ifolders';
import { Icontacts } from '../Icontacts';
import { Mail } from '../mail'
import {  map } from 'rxjs';
import { SharedService } from '../shared/shared.service';

// import router from angular router
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule } from '@angular/material/table';
// import './polyfills';


// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// import {NgbdDropdownNavbarModule} from './app/dropdown-navbar.module';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myText: string =""
  pw: string = ""
  res: any
  // collapsed = true
  constructor(private http:HttpClient,private route:Router, private shared:SharedService) {
    let divv = document.getElementById("xxx");
    divv?.setAttribute("style", "display: npne")
   }
  
  sub()
  {
    let atfound = false
    if(this.myText.length < 6)
    {
      alert("Email should be int this format: '###@###.com'")
    }
    for(let i = 0; i < this.myText.length - 4; i++)
    {
      let c = this.myText.charAt(i)
      if(this.myText.endsWith(".com"))
      {
        if(c == '@')
        {
          if(atfound)
          {
            alert("Email should be int this format: '###@###.com' where # should be number, letter or underscore")
            return
          }
          else
          {
            atfound = true
          }
        }
        else if (!((c>= '0' && c <= '9') || (c>= 'A' && c <= 'Z') || (c>= 'a' && c <= 'z') || c=="_"))
        {
          alert("Email should be int this format: '###@###.com' where # should be number, letter or underscore")
          return
        }
      }
      else
      {
        alert("Email should be int this format: '###@###.com'")
        return
      }
    }
    if(this.pw.length < 7)
    {
      alert("Password length should be bigger than 6")
      return
    }
    this.http.get("http://localhost:8888/controller/login",{
      responseType:'text',
      params:{
          email: this.myText,
          password: this.pw
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
        this.shared.setUser(this.myText)
        this.shared.setPass(this.pw)
        this.route.navigate(['folder',"inbox"])
      }
      catch(e)
      {
        alert("Wrong Email or Wrong Password!!")
      }
    })
  }










}
