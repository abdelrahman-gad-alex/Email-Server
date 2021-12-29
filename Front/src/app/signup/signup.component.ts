import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
// import { stringify } from 'querystring';

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
  constructor(private http:HttpClient) { }
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
    })

   
  }
  
  sendmail(email?: xp):Observable<any>
  {
    console.log(email)
    return this.http.post<any>("http://localhost:88888/controller/signup",email) 
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
