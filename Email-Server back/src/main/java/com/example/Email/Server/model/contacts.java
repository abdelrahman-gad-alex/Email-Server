package com.example.Email.Server.model;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.LinkedList;

public class contacts {
    public HashMap<String,String[] > contacts = new HashMap<String, String[]>();

    public boolean addcontact(String jasString)
    {
        System.out.println(jasString);
        try {
            JSONObject jas = new JSONObject(jasString);

            JSONArray arr = jas.names() ;
            String key = arr.getString(0);
            JSONArray arrvalues = new JSONArray(jas.getString(key));
            String[] values = new String[arrvalues.length()] ;
            for(int j = 0; j<arrvalues.length(); j++){
                values[j] = arrvalues.getString(j) ;
            }

            if(check(values)){
                contacts.put(key, values) ;
                System.out.println(values[0]);
                return true ;
            }else {
                System.out.println("one of the emails do not exist");

            }


        }catch (JSONException e){
            System.out.println("Error "+e.toString());
        }
        return false ;
    }
    public boolean editcontact( String oldname, String newname, String[] emails)
    {
        if(check(emails)){
            contacts.remove(oldname) ;
            contacts.put(newname,emails) ;
            return true ;
        }
        System.out.println("one of the emails do not exist");
        return false ;
    }

    public void deletecontact(String name)
    {
        contacts.remove(name);
    }


    boolean check(String[] emails){
        Email allmails = Email.getInstance() ;
        for (int i=0 ; i<emails.length ; i++){
            if(! allmails.existemail(emails[i])){
                return false ;
            }
        }
        return true ;
    }

    public LinkedList getContacts(){
        LinkedList contactsList = new LinkedList() ;
        for(String name: contacts.keySet() ){
            JSONObject contact = new JSONObject() ;
            try {
                contact.put("name", name) ;
                contact.put("emails", contacts.get(name)) ;

                contactsList.add(contact) ;
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
        return contactsList ;

    }
}
