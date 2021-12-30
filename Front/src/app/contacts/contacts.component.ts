import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar,faFile,faClock,faPaperPlane,faBookmark ,faTrash } from '@fortawesome/free-solid-svg-icons';
import { observable } from 'rxjs';
import { CONTACTS } from '../contacts';
import { Icontacts } from '../Icontacts';
import { SharedService } from '../shared/shared.service';
import { Mail } from '../mail';
import { Ifolders } from '../Ifolders';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {


  faStar=faStar;
  faClock=faClock;
  faPaperPlane=faPaperPlane;
  faFile=faFile;
  faBookmark=faBookmark;
  faTrash=faTrash;
  now =new Date()
  nx="s"
  contacts =this.shared.getContacts()
  newContactName=""
  newContactMail=""
  selected=-1
  editName:String=""
  arr:String[]=[]
  showededit:Boolean=false
  array:String[]=[]
  keyText!:string
  res: any



  constructor(private route: ActivatedRoute,  private shared:SharedService, private router: Router, private http:HttpClient) {
    console.log('MEntoconst')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    setInterval(() => {

    }, 1);
    this.now =  new Date();
  

  }
  ngOnInit(): void {

  }

  sendMail(mail:String){
    this.router.navigate(['compose',mail])
  }
  showAdd(){
    if(document.getElementById("cnameI")!.style.display=="block"){
      document.getElementById("cnameI")!.style.display="none"
      document.getElementById("cemailI")!.style.display="none"
      document.getElementById("cnameBTN2")!.style.display="none"

    }
    else{
      document.getElementById("cnameI")!.style.display="block"
      document.getElementById("cemailI")!.style.display="block"
      document.getElementById("cnameBTN2")!.style.display="block"
    }
  }

  add(){
    var st=true
    if (this.newContactName=="" )
    alert("Please Enter name")
    else if (this.newContactMail=="" )
    alert("Please Enter Mail")
    else{
      let obj = this.shared.getContacts().find(f=>f.name==this.newContactName);
      if (obj)
      alert("There ara Someone Has the same Name. Please choose new name.")
      else{
      for(let con of this.shared.getContacts()){
        let obj =con.mail.find(f=>f==this.newContactMail)
        if (obj){
        alert("You Already Stored the same mail to another contact")
        var st=false
        break;
       }
      }
    if (st){
      console.log("aaa")
      this.shared.getContacts().push( {"name": this.newContactName ,"mail":[this.newContactMail] }  )
      var map = new Map();    
      this.http.post<string>("http://localhost:8080/controller/addcontact",{"user":this.shared.getUser(),"name":(this.newContactName),"emails":[this.newContactMail]}).subscribe((res?:any)=>
      {
       console.log(res)
     })
      document.getElementById("cnameI")!.style.display="none"
    document.getElementById("cemailI")!.style.display="none"
    document.getElementById("cnameBTN2")!.style.display="none"
    this.newContactName=""
    this.newContactMail=""

    }
  }
}}

  
update(x:number){
    this.selected=x
    this.editName=this.shared.getContacts()[x].name
    this.arr=this.shared.getContacts()[x].mail
    this.array=this.arr
    if (this.showededit){
    document.getElementById("editName")!.style.display="none"
    document.getElementById("cnameBTN3")!.style.display="none"
    this.newContactName=""
    this.newContactMail=""
    for (let i=0 ;i<this.arr.length;i++){
      document.getElementById("mail"+i)!.style.display="none"
    }
  }
}

  showEdit(){
    if (this.selected==-1){
      alert("Please Select a contact before press edit")
    }
    else{
      document.getElementById("editName")!.style.display="block"
      document.getElementById("cnameBTN3")!.style.display="block"
      for (let i=0 ;i<this.arr.length;i++){
        document.getElementById("mail"+i)!.style.display="block"
      }
      this.showededit=true
      
  }

  }


edit(){
  if (this.editName==""){
    alert("Please Enter a Name before press OK")
  }
  else{
    console.log(this.editName)
    var x=this.shared.getContacts()[this.selected].name
    var y=this.shared.getContacts()[this.selected].mail
    this.shared.getContacts()[this.selected].name=this.editName
    for (let i=0 ;i<this.arr.length;i++){
      this.shared.getContacts()[this.selected].mail[i]=this.arr[i]
      console.log(this.shared.getContacts()[this.selected].mail[i])
    }
    
  
    observe:'response'
    console.log("aaa")
    this.http.get("http://localhost:8080/controller/editcontact",{
      responseType:'text',
      params:{
       user:this.shared.getUser(),
       oldname:x.toString(),
       newname:this.shared.getContacts()[this.selected].name.toString(),
       emails: this.shared.getContacts()[this.selected].mail.toString()
      },
     
      observe:'response'
    }).subscribe(response=>{
      console.log(response)
            if (response.body=="contact do not edited"){
              this.shared.getContacts()[this.selected].name=x
               // mento hy3ml haga hena 
              this.shared.getContacts()[this.selected].mail=y
              alert("This mail is not registered")
      }
    })
    {
      
    }  
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  }

}
trackByIdx(index: number, obj: any): any {
  return index;
}
delete(){
  if (this.selected==-1){
    alert("Please Select a contact before press edit")
   
  }
  else{
    console.log("show")
    this.http.delete("http://localhost:8080/controller/deletecontact",
    {
      responseType:"text",
      params:{
        user:this.shared.getUser(),
        name:this.shared.getContacts()[this.selected].name.toString()
      },
      observe:"response"
      
    }).subscribe(response=>{
      console.log(response);
    })
    this.shared.getContacts().splice (this.selected,1)

  }
}

onEnter(){
  var st =true
  for(let con of this.shared.getContacts()){
    let obj =con.mail.find(f=>f==this.newContactMail)
    if (obj){
    alert("You Already Stored the same mail to another contact")
    var st=false
    break;
   }
  }
   if (st){
    this.shared.getContacts()[this.selected].mail.push(this.newContactMail)
    this.http.get("http://localhost:8080/controller/editcontact",{
      responseType:'text',
      params:{
       user:this.shared.getUser(),
       oldname:this.shared.getContacts()[this.selected].name.toString(),
       newname:this.shared.getContacts()[this.selected].name.toString(),
       emails: this.shared.getContacts()[this.selected].mail.toString()
      },
      observe:'response'
    }).subscribe(response=>{
      console.log(response)
      if (response.body=="contact do not edited"){
        this.shared.getContacts()[this.selected].mail.splice((this.shared.getContacts()[this.selected].mail.length-1),1)
        alert("This mail is not registered")
      }
    })
    
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

   }
}
sortClick()
{
  this.http.get("http://localhost:8080/controller/sortcontact",{
    responseType: 'text',
    params:{
      body: this.shared.getUser()
    },
    observe: 'response'
  }).subscribe(response=>{
    this.res = JSON.parse(<string>response.body)
    console.log(this.res)
    let tempArr = this.res
    let cont:Icontacts[] = []
    for(let i = 0; i < tempArr.length; i++)
    {
      let temp:Icontacts = new Icontacts()
      temp.mail = tempArr[i].nameValuePairs.emails
      temp.name = tempArr[i].nameValuePairs.name
      cont.push(temp)
    }
    this.http.get("http://localhost:8080/controller/login",{
      responseType:'text',
      params:{
          email: this.shared.getUser(),
          password: this.shared.getPass()
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
        // this.shared.setUser(this.myText)
        // this.route.navigate(['folder',"inbox"])
      }
      catch(e)
      {
        alert("Wrong Email or Wrong Password!!")
      }
    })
  })
}
searchClick()
{
  let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
  if(this.keyText == "")
  {
    alert("Enter key text")
    return
  }
  this.http.get("http://localhost:8080/controller/searchcontact",{
    responseType: 'text',
    params:{
      user: this.shared.getUser(),
      searchEqual: this.keyText
    },
    observe: 'response'
  }).subscribe(response=>{
    this.res = JSON.parse(<string>response.body)
    console.log(this.res)
    let tempArr = this.res
    let cont:Icontacts[] = []
    for(let i = 0; i < tempArr.length; i++)
    {
      let temp:Icontacts = new Icontacts()
      temp.mail = tempArr[i].nameValuePairs.emails
      temp.name = tempArr[i].nameValuePairs.name
      cont.push(temp)
    }
    this.shared.setContacts(cont)
    this.http.get("http://localhost:8080/controller/login",{
      responseType:'text',
      params:{
          email: this.shared.getUser(),
          password: this.shared.getPass()
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
        // this.shared.setContacts(contacts)
        this.shared.setFolders(folders)
        this.shared.setMails(mails)
        // this.shared.setUser(this.myText)
        this.router.navigate([currentUrl]);
      }
      catch(e)
      {
        alert("Wrong Email or Wrong Password!!")
      }
    })
  })
}

}

