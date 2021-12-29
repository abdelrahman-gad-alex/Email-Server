import { Component, OnInit } from '@angular/core';
import { faStar,faFile,faClock,faPaperPlane,faBookmark ,faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { MAILS } from '../inboxMail';
import { FOLDERS } from '../folders';
import { zip } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ifolders } from '../Ifolders';
import { Icontacts } from '../Icontacts';
import { Mail } from '../mail'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faStar=faStar;
  faClock=faClock;
  faPaperPlane=faPaperPlane;
  faFile=faFile;
  res: any
  faBookmark=faBookmark;
  faTrash=faTrash
  mails=this.shared.getMails()

  folders=this.shared.getFolders()
  newFolderName:String="";
  curFolder:String="";
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.http.get("http://localhost:8888/controller/login",{
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

















        this.router.navigate([currentUrl]);
    }

    constructor(private http:HttpClient, private route: ActivatedRoute, private router: Router, private shared: SharedService) {
      console.log('MEntoconst')
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      setInterval(() => {
  
      }, 1);
  
    }
  ngOnInit(): void {
    this.curFolder =this.route.snapshot.paramMap.get('name')!;

  }

  showA(){
    if (document.getElementById("nameI")!.style.display=="block"){
      document.getElementById("nameI")!.style.display="none";
      document.getElementById("nameBTN")!.style.display="none";
    }
    else{
      document.getElementById("nameI")!.style.display="block";
      document.getElementById("nameBTN")!.style.display="block";
  
    }
  }
  showB(){
    if (document.getElementById("nameI2")!.style.display=="block"){
      document.getElementById("nameI2")!.style.display="none";
      document.getElementById("nameBTN2")!.style.display="none";
    }
    else{
      document.getElementById("nameI2")!.style.display="block";
      document.getElementById("nameBTN2")!.style.display="block";
  
    }
  }
  add(){
    if(this.newFolderName=="")
    alert("Please Enter A folder Name")
    else{
      let obj = this.shared.getFolders().find(f=>f.name==this.newFolderName);
      
      if (obj){
        alert("There ara a folder with the same selected name . Please choose new name.")
      }
      else{
        this.shared.getFolders().push(  {"name": this.newFolderName ,"id":[] }    )
    document.getElementById("nameI")!.style.display="none";
      this.newFolderName=""
    document.getElementById("nameBTN")!.style.display="none";
      }
    }
    console.log(this.shared.getFolders())
  }
  remove()
  {
    console.log(this.curFolder)
    switch(this.curFolder)
    {
      case "inbox":
      case "sent":
      case "drafts":
      case "trash":
      case "all-mail":
        alert("Main Folder Cannot Be Delated")
        break;
      default:
        const index = this.shared.getFolders().findIndex(object => {
          return object.name === 'this.curFolder';
        });
        this.shared.getFolders().splice (index,1)
        this.router.navigate(['folder',"inbox"])
      break;

    }
    console.log(this.shared.getFolders())

  }
  rename()
  {    
  if(this.newFolderName=="")
  alert("Please Enter A folder Name")
  else  
    switch(this.curFolder){
      case "inbox":
        case "sent":
        case "drafts":
        case "trash":
        case "all-mail":
          alert ("Main Folder Cannot Be Renamed");
          break;
        default:
          let obj = this.shared.getFolders().find(f=>f.name==this.curFolder);
          
          if (obj){
          obj!.name=this.newFolderName
          this.router.navigate(['folder',this.newFolderName])
          document.getElementById("nameI2")!.style.display="none";
          this.newFolderName=""
          document.getElementById("nameBTN2")!.style.display="none";
          }
    }

  }

}
