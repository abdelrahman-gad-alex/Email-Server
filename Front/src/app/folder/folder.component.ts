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
import { HttpClient } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  faStar=faStar;
  faClock=faClock;
  faPaperPlane=faPaperPlane;
  res: any
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
  constructor(private route: ActivatedRoute, private router: Router, private shared:SharedService , private http:HttpClient) {
    
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
    for(let i = 0; i < this.folder.length; i++)
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
  deleteSelect()
  {
    document.getElementById("textDiv1")!.style.display="none"
    document.getElementById("butDiv")!.style.display="none"
    document.getElementById("textDiv2")!.style.display="none"
    this.operation ="delete"
    if(this.fileIn != "trash")
    {
      let trashIdx = -1
      this.foldText = "trash"
      this.operButClick()
      console.log("hi")
      if(this.fileIn == "allMails")
      {
        for(let i = 0; i < this.folder.length; i++)
        {
          if(this.folder[i].name == "trash")
          {
            trashIdx = i
          }
        }
        for(let i = 0; i < this.folder.length; i++)
        {
          console.log(this.folder[i].id)
          console.log("hiiiiii"+ this.folder[trashIdx].id)
          for(let j = 0; j < this.folder[trashIdx].id.length; j++)
          {
            if(!(this.folder[i].name == "allMails" || this.folder[i].name == "trash"))
            {
              // if(this.folder[i].id.indexOf(this.folder[trashIdx].id[j]) != -1)
              // {
              //   console.log("king")
              //   this.folder[i].id.splice(this.folder[i].id.indexOf(<number>this.folder[trashIdx].id[j]), 1)
              // }
              for(let k = 0; k < this.folder[i].id.length; k++)
              {
                if(this.folder[i].id[k] == this.folder[trashIdx].id[j])
                {
                  this.folder[i].id.splice(k, 1)
                }
              }
            }
          }
          let tempStr: String = this.folder[i].name
          this.shared.setFolderID(<string>tempStr, this.folder[i].id)
        }
      }
      return
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
