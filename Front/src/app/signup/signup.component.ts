import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Ifolders } from '../Ifolders';
import { Icontacts } from '../Icontacts';
import { Mail } from '../mail'
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  myText: string =""
  pw: string = ""
  pwc: string = ""
  res: any 
  resp: any
  constructor(private http:HttpClient, private shared:SharedService, private route:Router) { }
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
    if(this.pw != this.pwc)
    {
          alert("Password and confirmation password are not the same")
      return
    }
    if(this.pw.length < 7)
    {
      alert("Password length should be bigger than 6")
      return
    }
    // this.http.get("http:/localhost:8080/signup",
    // {
    //   responseType: 'text',
    //   params:
    //   {
    //     email: this.myText,
    //     password: this.pw
    //   },
    //   observe:'response'
    // }
    // ).subscribe(response=>{
    //   this.res = response.body
    //   console.log(this.res)
    // })
    // ans : string;
    let email= new xp(this.myText, this.pw)
    this.sendmail(email).subscribe((temp?: any)=>
    {
      this.res = temp
      console.log(this.res)
      if(this.res != "user is added")
      {
        alert("Invalid email, maybe it is used before")
      }
      else{
        this.http.get("http://localhost:8080/controller/login",{
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
    })

   
  }
  
  sendmail(email?: xp):Observable<any>
  {
    console.log(email)
    return this.http.post<any>("http://localhost:8080/controller/signup",email) 
  }
}
class xp
{
  email!: string
  password!: string
  constructor(x: string, y:string)
  {
    this.email = x;
    this.password =y;
  }
}
