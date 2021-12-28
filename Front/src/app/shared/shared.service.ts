import { Injectable } from '@angular/core';
import { Ifolders } from '../Ifolders';
import { Icontacts } from '../Icontacts';
import { Mail } from '../mail'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  folders !: Ifolders[]
  contacts !: Icontacts[]
  mails !: Mail[]
  user !: string
  pass !: string
  constructor() { }
  setPass(x: string)
  {
    this.pass =x
  }
  getPass()
  {
    return this.pass
  }
  setUser(x: string)
  {
    this.user = x
  }
  getUser()
  {
    return this.user
  }
  getFolders()
  {
    return this.folders
  }
  getContacts()
  {
    return this.contacts
  }
  getMails()
  {
    return this.mails
  }
  setMails(x: Mail[])
  {
    this.mails = x
  }
  setContacts(x: Icontacts[])
  {
    this.contacts = x
  }
  setFolders(x: Ifolders[])
  {
    this.folders = x
  }
}
