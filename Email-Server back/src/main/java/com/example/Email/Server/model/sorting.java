package com.example.Email.Server.model;

import org.json.JSONException;
import org.json.JSONObject;

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
   String dumi;
   String dumi2;
   if(method=="emailcontent")
   {
       Map <String, String> map2 = new HashMap <String, String>( );
       for (Map.Entry<String, String> entry : map.entrySet()) {
           dumi=entry.getKey();
           dumi.replaceAll("<p>","");
           dumi.replaceAll("</p>","");
           dumi.replaceAll("<h1>","");
           dumi.replaceAll("</h1>","");
           dumi.replaceAll("<h2>","");
           dumi.replaceAll("</h2>","");
           dumi.replaceAll("<h3>","");
           dumi.replaceAll("</h3>","");
           dumi.replaceAll("<h4>","");
           dumi.replaceAll("</h4>","");
           dumi.replaceAll("</h5>","");
           dumi.replaceAll("<h5>","");
           dumi.replaceAll("<h6>","");
           dumi.replaceAll("</h6>","");
           dumi2=entry.getValue();
           map2.put(dumi,dumi2);
       }
       TreeMap<String, String> sorted = new TreeMap<>();
       sorted.putAll(map2);
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
   else
   {
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
contacts contact;
public LinkedList SORTCONTACT(String user)
{
    Map <String, String[]> map = new HashMap <String, String[]>( );
    map= Email.getInstance().getUser(user).contact.contacts;
    TreeMap<String, String[]> sorted = new TreeMap<>();
    sorted.putAll(map);
    LinkedList contactsList = new LinkedList() ;
    for(String name: sorted.keySet() ){
        JSONObject contact = new JSONObject() ;
        try {
            contact.put("name", name) ;
            contact.put("emails", map.get(name)) ;

            contactsList.add(contact) ;
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }
    return contactsList ;
}

}
