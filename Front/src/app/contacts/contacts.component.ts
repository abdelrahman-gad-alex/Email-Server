import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar,faFile,faClock,faPaperPlane,faBookmark ,faTrash } from '@fortawesome/free-solid-svg-icons';
import { CONTACTS } from '../contacts';
import { SharedService } from '../shared/shared.service';

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
      this.shared.getContacts().push( {"name": this.newContactName ,"mail":[this.newContactMail] }  )
      var map = new Map();    
      this.http.post<string>("http://localhost:8080/controller/addcontact",{"user":this.shared.getUser(),"name":(this.newContactName),"emails":[this.newContactMail]})
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
    this.shared.getContacts()[this.selected].name=this.editName
    for (let i=0 ;i<this.arr.length;i++){
      this.shared.getContacts()[this.selected].mail[i]=this.arr[i]
      console.log(this.shared.getContacts()[this.selected].mail[i])
    }
    this.http.get("http://localhost:8080/controller/editcontact",{
      params:{
       user:this.shared.getUser(),
       oldname:x.toString(),
       newname:this.shared.getContacts()[this.selected].name.toString(),
       emails: this.shared.getContacts()[this.selected].mail.toString()
      }
    })  
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
    this.http.delete("http://localhost:8080/controller/deletecontact",
    {
      params:{
        user:this.shared.getUser(),
        name:this.shared.getContacts()[this.selected].name.toString()
      }
      
    })
  }
  else{
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
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

   }
}


}

