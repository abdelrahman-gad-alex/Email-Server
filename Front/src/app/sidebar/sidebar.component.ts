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
  curFolder:String="";

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
      let obj = FOLDERS.find(f=>f.name==this.newFolderName);
      
      if (obj){
        alert("There ara a folder with the same selected name . Please choose new name.")
      }
      else{
    FOLDERS.push(  {"name": this.newFolderName ,"id":[] }    )
    document.getElementById("nameI")!.style.display="none";
      this.newFolderName=""
    document.getElementById("nameBTN")!.style.display="none";
      }
    }
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
        const index = FOLDERS.findIndex(object => {
          return object.name === 'this.curFolder';
        });
        FOLDERS.splice (index,1)
        this.router.navigate(['folder',"inbox"])
      break;

    }
  
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
          let obj = FOLDERS.find(f=>f.name==this.curFolder);
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
