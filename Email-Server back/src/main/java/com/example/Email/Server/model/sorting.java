package com.example.Email.Server.model;

import java.util.*;

public class sorting {

public int[] sorted(String user,String folder, String method )
{
    Email theserver = Email.getInstance() ;
    User theuser = theserver.getUser(user) ;
    HashMap<Long,Message> folders= new HashMap<Long,Message>();
    String[] methodarray = new String[folders.size()];
   folders= theuser.inbox.getFolderMails(folder);
    Map <String, String> map = new HashMap <String, String>( );
    int i=0;
   for(Message m: folders.values() ){
         map.put(m.getAttr(method),m.getAttr("id"));

   }
    TreeMap<String, String> sorted = new TreeMap<>();
    sorted.putAll(map);
    Collection<String> values = sorted.values();
    ArrayList<String> listOfValues
            = new ArrayList<>(values);
   int size=listOfValues.size();
    int[] result= new int[folders.size()];
    for(int j=0; j<size; j++) {
        result[j] = Integer.parseInt(listOfValues.get(j));
    }
      return result;
}
}
