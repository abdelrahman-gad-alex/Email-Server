import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {Router} from '@angular/router'; // import router from angular router


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myText: string =""
  pw: string = ""
  res: any
  constructor(private http:HttpClient,private route:Router) { }
  
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
    console.log(this.myText)
    console.log(this.pw)
    this.http.get<Boolean>("http://localhost:8080/login",
    {
      params:
      {////////////////////////
        mail: this.myText,
        pass: this.pw
      },
      observe:'response'
    }
    ).subscribe(response=>{
      this.res = response.body
      if (this.res)
      this.route.navigate(['/inbox']);
      else
      alert("Email address or password is incorrect")
      
    })
  }
}
