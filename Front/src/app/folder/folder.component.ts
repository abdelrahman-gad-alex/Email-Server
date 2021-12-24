import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar,faFile,faClock,faPaperPlane,faBookmark ,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FOLDERS } from '../folders';
import { MAILS } from '../inboxMail';
import { Mail } from '../mail';

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
  id:number[]=[]
  folder=FOLDERS

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('MEntoconst')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    setInterval(() => {

    }, 1);
    this.now =  new Date();
  

   }

  ngOnInit(): void {
    let fol =this.route.snapshot.paramMap.get('name')!;
    var result = this.folder.filter(obj => {
      return obj.name === fol
    })
    console.log(fol)
    this.id =result[0].id
    for(let i of this.id)
    this.mails.push(MAILS[i])

  }

  showMail(mail: { id: number; }){
    this.router.navigate(['mail',mail.id])
  }

}
