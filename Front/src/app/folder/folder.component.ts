import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar,faFile,faClock,faPaperPlane,faBookmark ,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FOLDERS } from '../folders';
import { MAILS } from '../inboxMail';
import { Mail } from '../mail';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

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
  now =new Date()

  mails:Mail[] =[]
  // dataSource:any
  id:number[]=[]
  folder=FOLDERS
  map: any
  // map.set(1, 'www.javatpoint.com');       
  // map.set(true, 'bool1');   
  // map.set('2', 'ajay'); 
  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('MEntoconst')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    setInterval(() => {

    }, 1);
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
    let fol =this.route.snapshot.paramMap.get('name')!;
    var result = this.folder.filter(obj => {
      return obj.name === fol
    })
    console.log(fol)
    this.id =result[0].id
    
    
    for(let i of this.id)
    this.mails.push(MAILS[i])
    
    // this.dataSource = this.mails;

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
   for(let i = 0; i < this.mails.length;i++)
   {
     if(this.selectedMails.includes(this.mails[i].id))
     {
       let fol =this.route.snapshot.paramMap.get('name')!;
       var result = this.folder.filter(obj => {
        return obj.name === fol
      })
      // if(FOLDERS[this.map.get(result)].id.includes())
      // FOLDERS[this.map.get(result)].id.splice()
     }
     this.mails.splice(i, 1)
     MAILS.splice(i,1)
   }
   this.dataSource = new MatTableDataSource<Mail>(MAILS);
 }
}
