import { Component, OnInit } from '@angular/core';
import { faStar,faFile,faClock,faPaperPlane,faBookmark ,faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { MAILS } from '../inboxMail';
import { FOLDERS } from '../folders';
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
  folder=FOLDERS

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
    var result = this.folder.filter(obj => {
      return obj.name === "Inbox"
    })
    this.inbox=result[0].id
    result = this.folder.filter(obj => {
      return obj.name === "Sent"
    })
    this.Sent=result[0].id
    var result = this.folder.filter(obj => {
      return obj.name === "Drafts"
    })
    this.Drafts=result[0].id
    result = this.folder.filter(obj => {
      return obj.name === "Trash"
    })
    this.Trash=result[0].id
    result = this.folder.filter(obj => {
      return obj.name === "All Mail"
    })
    this.AllMail=result[0].id
  }

}
