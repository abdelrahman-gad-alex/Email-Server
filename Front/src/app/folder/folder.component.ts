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
  fileIn: string = ""
  operation: string = ""
  foldText: string = ""
  keyText: string = ""
  div1 = document.getElementById('textDiv1')
    div2 = document.getElementById('textDiv2')
    butDiv = document.getElementById('butDiv')
  constructor(private route: ActivatedRoute, private router: Router, private shared:SharedService ) {
    
    console.log('MEntoconst')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // setInterval(() => {

    // }, 1);
    this.folder = this.shared.getFolders()
    let fol =this.route.snapshot.paramMap.get('name')!;
    console.log("hi    " + fol)
    this.fileIn = fol
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
   displayedColumns: string[] = ['select', 'from', 'to', 'importance', 'subject', 'time'];
  ngOnInit(): void {
    // this.folder = this.shared.getFolders()
    // let fol =this.route.snapshot.paramMap.get('name')!;
    // console.log("hi    " + fol)
    // this.fileIn = fol
    // for(let i = 0; i < this.folder.length; i++)
    // {
    //   if(this.folder[i].name == fol)
    //   {
    //     this.id = this.folder[i].id
    //   }
    // }
    // // console.log(fol)
    // // console.log(result[0])
    // // this.id =result[0].id
    
    // let MAILS = this.shared.getMails()
    // for(let i of this.id)
    // this.mails.push(MAILS[i])
    
    // // this.dataSource = this.mails;
    // this.user = this.shared.getUser()
    // console.log(this.user)
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
  moveClick()
  {
    document.getElementById("butDiv")!.style.display="block"
    document.getElementById("textDiv2")!.style.display="block"
    this.operation = "move"
  }
  operButClick()
  {
    let tempIdx : number = -1
    let tempToFolder : number = -1
    if(this.operation == "move" || this.operation=="delete")
    {
      let temp = this.foldText
      if(this.operation == "delete")
      {
        temp = "trash"
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
          if(this.folder[j].name == this.fileIn)
          {
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
      this.shared.setFolderID(temp, tempArr)
      
    }
  }
  deleteSelect()
  {
    if(this.fileIn != "trash")
    {
      this.foldText = "trash"
      this.operButClick()
    }
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
    }
      this.shared.setFolderID(this.fileIn, this.folder[temp].id)
      this.shared.setFolderID( "allMails", this.folder[tempAll].id)
      let MAILS = this.shared.getMails()
      this.id = this.folder[temp].id
      this.mails = []
      this.selectedMails = []
      for(let i of this.id)
        this.mails.push(MAILS[i])
    this.dataSource = new MatTableDataSource<Mail>(this.mails);
  }
}
