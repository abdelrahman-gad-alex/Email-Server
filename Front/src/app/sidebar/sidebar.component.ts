import { Component, OnInit } from '@angular/core';
import { faStar,faFile,faClock,faPaperPlane,faBookmark ,faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { MAILS } from '../inboxMail';
import { FOLDERS } from '../folders';
import { zip } from 'rxjs';
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
  faBookmark=faBookmark;
  faTrash=faTrash
  mails =MAILS
  folders=FOLDERS
  newFolderName:String="";

  inbox:number[]=[];
  Sent:number[]=[];
  Drafts:number[]=[];
  Trash:number[]=[];
  AllMail:number[]=[];

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
    constructor(private route: ActivatedRoute, private router: Router) {
      console.log('MEntoconst')
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      setInterval(() => {
  
      }, 1);
  
    }
  ngOnInit(): void {
    var result = this.folders.filter(obj => {
      return obj.name === "inbox"
    })
    this.inbox=result[0].id

    result = this.folders.filter(obj => {
      return obj.name === "sent"
    })
    this.Sent=result[0].id

    var result = this.folders.filter(obj => {
      return obj.name === "drafts"
    })
    this.Drafts=result[0].id

    result = this.folders.filter(obj => {
      return obj.name === "trash"
    })
    this.Trash=result[0].id

    result = this.folders.filter(obj => {
      return obj.name === "all-mail"
    })
    this.AllMail=result[0].id
  }

  show(){
    document.getElementById("nameI")!.style.display="block";
    document.getElementById("nameBTN")!.style.display="block";
  }
  add(){
    if(this.newFolderName=="")
    alert("Please Enter A folder Name")
    else{
    FOLDERS.push(  {"name": this.newFolderName ,"id":[] }    )
    document.getElementById("nameI")!.style.display="none";
      this.newFolderName=""
    document.getElementById("nameBTN")!.style.display="none";
    }
  }
  remove(folderName :String)
  {
    switch(folderName)
    {
      case "inbox":
      case "sent":
      case "drafts":
      case "trash":
      case "all-mail":
        alert("Folder Cannot Be Delated")
        break;
      default:
        const index = FOLDERS.findIndex(object => {
          return object.name === 'trash';
        });
        
        FOLDERS.splice (index,1)
    
    }
  
  }
  rename(oldFolderName :String, newFolderName :String)
  {
    let obj = FOLDERS.find(f=>f.name==oldFolderName);
    obj!.name=newFolderName
  }

}
