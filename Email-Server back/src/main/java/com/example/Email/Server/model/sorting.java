package com.example.Email.Server.model;

import java.util.HashMap;

public class sorting {

private int[] sort(String user,String folder, String method )
{
    Email theserver = Email.getInstance() ;
    User theuser = theserver.getUser(user) ;
    HashMap<Long,Message> folders= new HashMap<Long,Message>();
    String[] methodarray = new String[folders.size()];
   folders= theuser.inbox.getFolderMails(folder);
   int i=0;
   for(Message m: folders.values() ){

       methodarray[i]=  m.getAttr(method);
       i++;
   }
      return new int[]{1};
}
}
