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

  foldText: string = ""
  id:number[]=[]
  keyText: string = ""
  fileIn: string = ""
  operation: string = ""

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

  colParam!: string
  searchClick(col: string)
  {
    this.keyText = ""
    document.getElementById("textDiv2")!.style.display="none"
    document.getElementById("butDiv")!.style.display="block"
    document.getElementById("textDiv1")!.style.display="block"
    this.operation = "search"
    this.colParam = col
    // this.operButClick()
  }
  moveClick()
  {
    this.foldText = ""
    document.getElementById("textDiv1")!.style.display="none"
    document.getElementById("butDiv")!.style.display="block"
    document.getElementById("textDiv2")!.style.display="block"
    this.operation = "move"
  }
  filterClick(col: string)
  {
    this.foldText = ""
    this.keyText =""
    document.getElementById("textDiv1")!.style.display="block"
    document.getElementById("butDiv")!.style.display="block"
    document.getElementById("textDiv2")!.style.display="block"
    this.operation= "filter"
  }
  sortClick(col: string, order:string)
  {
    document.getElementById("textDiv1")!.style.display="none"
    document.getElementById("butDiv")!.style.display="none"
    document.getElementById("textDiv2")!.style.display="none"
    let foldIdx = -1
    for(let i = 0; i < this.contacts.length; i++)
    {
      if(this.fileIn == this.folder[i].name)
      {
        foldIdx = i
        break
      }
    }
    // this.folder[foldIdx].id 
    this.http.get("http://localhost:8080/controller/sort",{
      responseType:'text',
      params:{
          body: this.shared.getUser(),
          foldr: this.fileIn,
          method: col
      },
      observe:'response'
    }).subscribe(
      response =>{
        this.res =JSON.parse(<string>response.body)
        this.folder[foldIdx].id = this.res.ans
        if(order == 'asc')
        {
          this.id = this.folder[foldIdx].id.reverse()
        }
        else
        {
          this.id = this.folder[foldIdx].id
        }
        this.mails = []
        let MAILS = this.shared.getMails()
        for(let i of this.id)
          this.mails.push(MAILS[i])
        this.dataSource = new MatTableDataSource<Mail>(this.mails);
      }
    )
  }
  operButClick()
  {
    let tempIdx : number = -1
    let tempToFolder : number = -1
    if(this.operation == "move" || this.operation=="delete")
    {
      let allMailsIdx = -1
      let temp = this.foldText
      if(this.operation == "delete")
      {
        temp = "trash"
        console.log("marwan pablo")
      }
      if(temp == 'inbox' || temp == 'sent' || (temp == 'trash' && this.operation != "delete") || temp == 'draft' || temp == 'allMails')
      {
        alert("You can not move to this folder")
        return
      }
      else if(this.fileIn == temp)
      {
        alert("You can not move to current folder")
        return
      }
      else
      {
        // let flag: boolean = false
        for(let i = 0; i < this.folder.length; i++)
        {
          if(this.folder[i].name == temp)
          {
            tempToFolder = i
            // flag = true
          }
        }
      }
      if(tempToFolder == -1)
      {
        alert("File not found")
        return
      }
      for(let i = 0; i < this.selectedMails.length; i++)
      {
        for(let j = 0; j < this.folder.length; j++)
        {
          if(this.folder[j].name == this.fileIn || (this.folder[j].name == "allMails" && this.operation=="delete"))
          {
            if(this.operation=="delete")
            {
              allMailsIdx = j
              this.folder[j].id.splice(this.folder[j].id.indexOf(this.selectedMails[i]), 1)
            }
            tempIdx = j
            this.folder[j].id.splice(this.folder[j].id.indexOf(this.selectedMails[i]), 1)
          }
          // else if(this.folder[j].name == temp)
          // {
          //   
          // }
        }
      }
      this.shared.setFolderID(this.fileIn, this.folder[tempIdx].id)
      let tempArr = this.selectedMails.concat(this.folder[tempToFolder].id)
      this.folder[tempToFolder].id = tempArr
      if(this.operation == "delete")
      {
        this.shared.setFolderID("allMails", this.folder[allMailsIdx].id)
      }
      this.shared.setFolderID(temp, tempArr)
      let MAILS = this.shared.getMails()
      this.id = this.folder[tempIdx].id
      this.mails = []
      this.selectedMails = []
      for(let i of this.id)
        this.mails.push(MAILS[i])
      this.dataSource = new MatTableDataSource<Mail>(this.mails);

    }
    else if(this.operation == "search")
    {
      if(this.keyText == "")
      {
        alert("Enter text to search for")
      }
      this.http.get("http://localhost:8888/controller/search",{
      responseType:'text',
      params:{
          user: this.shared.getUser(),
          folder: this.fileIn,
          seatchBy: this.colParam,
          equal: this.keyText
      },
      observe:'response'
    }).subscribe(
      response =>{
        this.res =JSON.parse(<string>response.body)
        this.id = this.res.ans
        this.mails = []
        let MAILS = this.shared.getMails()
        for(let i of this.id)
          this.mails.push(MAILS[i])
        this.dataSource = new MatTableDataSource<Mail>(this.mails);
        // this.folder[foldIdx].id = this.res.ans
        // if(order == 'asc')
        // {
        //   this.id = this.folder[foldIdx].id.reverse()
        // }
        // else
        // {
        //   this.id = this.folder[foldIdx].id
        // }
        // this.mails = []
        // let MAILS = this.shared.getMails()
        // for(let i of this.id)
        //   this.mails.push(MAILS[i])
        // this.dataSource = new MatTableDataSource<Mail>(this.mails);
      }
    )
    }
    else if(this.operation == "filter")
    {
      if(this.keyText == "")
      {
        alert("Enter text to search for")
        return
      }
      else if(this.foldText== "")
      {
        alert("Enter folder to move to")
        return
      }
////////////////////////////////////////////////////
      if(this.foldText=="")
    alert("Please Enter A folder Name")
    else{
      let obj = this.shared.getFolders().find(f=>f.name==this.foldText);
      
      if (obj){
        alert("There ara a folder with the same selected name . Please choose new name.")
      }
      else{
        this.shared.getFolders().push(  {"name": this.foldText ,"id":[] }    )
      this.foldText=""
      }
    }
    console.log(this.shared.getFolders())
    
//////////////////////////////////////////////////////////////
    } 
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

