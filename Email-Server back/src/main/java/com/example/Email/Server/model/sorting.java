package com.example.Email.Server.model;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.*;

public class sorting {


public int[] sorted(String user,String folder, String method )
{
    System.out.println(method);
    System.out.println(method);
    Email theserver = Email.getInstance() ;
    User theuser = theserver.getUser(user) ;
    HashMap<Long,Message> folders= new HashMap<Long,Message>();
    String[] methodarray = new String[folders.size()];
   folders= theuser.inbox.getFolderMails(folder);
     System.out.println(folders.size());
    Map <String, String> map = new HashMap <String, String>( );
    int i=0;
    PriorityQueue<Map.Entry<String,String>> q =new PriorityQueue<>();
    PriorityQueue<String> queue=new PriorityQueue<String>();
    LinkedList<String>[] arr = new LinkedList[folders.size()];
    for(Message m: folders.values() ){
         map.put(m.getAttr(method),  m.getAttr("id")  );


         arr[i]=new LinkedList() ;

         arr[i].add(m.getAttr("id")) ;
         arr[i].add(m.getAttr(method)) ;
         i++;


   }
 if(method!="time")
 {
     for(int f=0;f<arr.length-1;f++)
     {
         for(int z=f+1;z<arr.length;z++)
         {

             if(arr[f].get(1).compareTo(arr[z].get(1))>0)
             {
                 LinkedList temp= arr[f];
                 arr[f]=arr[z];
                 arr[z]=temp;
             }
         }
     }
 }
 else
 {
     for(int f=0;f<arr.length-1;f++)
     {
         for(int z=f+1;z<arr.length;z++)
         {

             if(arr[f].get(0).compareTo(arr[z].get(0))>0)
             {
                 LinkedList temp= arr[f];
                 arr[f]=arr[z];
                 arr[z]=temp;
             }
         }
     }
 }

    int[] res=new int[folders.size()];
    for (int k=0;k<arr.length;k++)
    {
        res[k]= Integer.parseInt(arr[k].get(0));
        System.out.println(res[k]);
    }

     return res;


/*
    System.out.println(queue);
*
   String dumi;
   String dumi2;
   if(method=="emailContent")
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
   else if(method.equals("importance"))
   {

       System.out.println("hena2");
       Map <Integer, String> map2 = new HashMap <Integer, String>( );
       Integer convt;
       String convt2;
       TreeMap<String, String> sorted = new TreeMap<>();
       sorted.putAll(map);

       Collection<String> values = sorted.values();
       ArrayList<String> listOfValues
               = new ArrayList<>(values);
       int size=listOfValues.size();
       int[] result= new int[folders.size()];
       for(int j=0; j<size; j++) {
           result[j] = Integer.parseInt(listOfValues.get(j));
           System.out.print("ay haga");
           System.out.println(result[j]);
       }
       return result;
   }
   else
   {
       System.out.println("hena");
       TreeMap<String, String> sorted = new TreeMap<>();
       sorted.putAll(map);
       Collection<String> values = sorted.values();
       ArrayList<String> listOfValues
               = new ArrayList<>(values);
       int size=listOfValues.size();
       int[] result= new int[folders.size()];
       for(int j=0; j<size; j++) {
           result[j] = Integer.parseInt(listOfValues.get(j));
           System.out.println(result[j]);
       }
       return result;
   }
*/
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
