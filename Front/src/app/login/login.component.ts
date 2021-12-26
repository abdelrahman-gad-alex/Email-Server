import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {Router} from '@angular/router'; // import router from angular router
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
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

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
      this.route.navigate(['/folder/Inbox']);
      else
      alert("Email address or password is incorrect")
      
    })
  }





  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;







}
