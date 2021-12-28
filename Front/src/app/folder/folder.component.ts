import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar,faFile,faClock,faPaperPlane,faBookmark ,faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FOLDERS } from '../folders';
// import { MAILS } from '../inboxMail';
import { Mail } from '../mail';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedService } from '../shared/shared.service';
import { MAILS } from '../inboxMail';
import { Ifolders } from '../Ifolders';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  faStar=faStar;
  faClock=faClock;
  faPaperPlane=faPaperPlane;
  faFile=faFile;
  faBookmark=faBookmark;
  faTrash=faTrash;
  user!: string
  now =new Date()
  mails:Mail[] =[]
  // dataSource:any
  id:number[]=[]
  folder : Ifolders[] = []
  map: any
  // toBut: any
  // fromBut: any
  // toButton = true
  // fromButton = true
  fileIn: string = ""
  // map.set(1, 'www.javatpoint.com');       
  // map.set(true, 'bool1');   
  // map.set('2', 'ajay'); 
  constructor(private route: ActivatedRoute, private router: Router, private shared:SharedService ) {
    console.log('MEntoconst')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // setInterval(() => {

    // }, 1);
    this.now =  new Date();
    this.map = new Map();  
    this.map.set('inbox', 0); 
    this.map.set('sent', 1); 
    this.map.set('drafts', 2); 
    this.map.set('trash', 3); 
    this.map.set('all-mail', 4);   

   }
   displayedColumns: string[] = ['select', 'from', 'to', 'importance', 'subject', 'time'];
  ngOnInit(): void {
    // fileIn: string = ""
    this.folder = this.shared.getFolders()
    let fol =this.route.snapshot.paramMap.get('name')!;
    // this.toBut = document.getElementById("toID")
    // this.fromBut = document.getElementById("fromID")
    // var result = this.folder.filter(obj => {
    //   return obj.name === fol
    // })
    console.log("hi    " + fol)
    this.fileIn = fol
    // if(fol == "inbox")
    // {
    //   // // this.toButton = true
    //   // // this.fromButton = false
    //   // console.log("iiiii")
    //   this.toBut.disabled = true
    //   this.fromBut.disabled = false
    // }
    // else if(fol == "sent")
    // {
    //   // this.toButton = false
    //   // this.fromButton = true
    //   // console.log("fffff")
    //   this.toBut.disabled = false
    //   this.fromBut.disabled = true
    // }
    for(let i = 0; i < this.folder.length; i++)
    {
      if(this.folder[i].name == fol)
      {
        this.id = this.folder[i].id
      }
    }
    // console.log(fol)
    // console.log(result[0])
    // this.id =result[0].id
    
    let MAILS = this.shared.getMails()
    for(let i of this.id)
    this.mails.push(MAILS[i])
    
    // this.dataSource = this.mails;
    this.user = this.shared.getUser()
    console.log(this.user)
  }
  dataSource = new MatTableDataSource<Mail>(this.mails);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<Mail>(true, []); 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  // showMail(mail: { id: number; }){
  //   this.router.navigate(['mail',mail.id])
  // }
  showMail(id: any){
    this.router.navigate(['mail',id])
  }
  selectedMails: Array<number> = [];
  onElementSelected(id: number)
  {
    if(this.selectedMails.includes(id))
    {
      
      this.selectedMails.splice(this.selectedMails.indexOf(id), 1)
    }
    else
    {
      this.selectedMails.push(id)
    }
    console.log(this.selectedMails)
  }
 deleteSelect()
 {
   let temp : number = -1
   let tempAll : number = -1
   for(let i = 0; i < this.selectedMails.length; i++)
   {
     for(let j = 0; j < this.folder.length; j++)
     {
       if(this.folder[j].name == this.fileIn || this.folder[j].name == "allMails")
       {
        if(this.folder[j].name == this.fileIn )
        {
          temp = j
        }
        else
        {
          tempAll = j
        }
        this.folder[j].id.splice(this.folder[j].id.indexOf(this.selectedMails[i]), 1)
       }
     }
     this.shared.setFolderID(this.fileIn, this.folder[temp].id)
     this.shared.setFolderID( "allMails", this.folder[tempAll].id)
     let MAILS = this.shared.getMails()
     this.id = this.folder[temp].id
     this.mails = []
     this.selectedMails = []
     for(let i of this.id)
      this.mails.push(MAILS[i])
  //    if(this.selectedMails.includes(this.mails[i].id))
  //    {
  //      let fol =this.route.snapshot.paramMap.get('name')!;
  //      var result = this.folder.filter(obj => {
  //       return obj.name === fol
  //     })
  //     // if(FOLDERS[this.map.get(result)].id.includes())
  //     // FOLDERS[this.map.get(result)].id.splice()
  //    }
  //    this.mails.splice(i, 1)
  //    MAILS.splice(i,1)
    }
   this.dataSource = new MatTableDataSource<Mail>(this.mails);
 }
}
