package com.example.Email.Server.Controller;

import com.example.Email.Server.model.*;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;
import org.json.*;

import java.util.LinkedList;

public class MainController {
    Email mails = Email.getInstance();
    director Direct = new director();
    sorting sortt =new sorting();
    public String Signup(String email) throws JSONException {
        JSONObject json = new JSONObject(email);
        String Email  =  json.getString("email");
        String password  =  json.getString("password");
        System.out.println(Email);
        boolean result;
        validation valid =new validation();
       result= valid.isValid(Email);
       System.out.println(result);
        if(result==true)
        {
            User user = new User();
            user = Direct.construct(user , Email, password) ;
            mails.add(Email, user);

        }
        else
        {
            return "n valid form for email";
        }

        update() ;

        return "user is added";
    }


    public String login(String email, String password)
    {
        boolean result;

        result= mails.existUser(email,password);

        System.out.println("in login");

        mails.print();

        if(result==true)
        {
            return mails.getUser(email).gerUserData() ;
        }
        else
        {
            return "invalid ";
        }
    }

    public String sendEmail (String mailStr){
        System.out.println(mailStr);

        Message m = new Message(mailStr);

        // check with json scheme

        String[] toArr= m.getTo() ;
        if(toArr == null){
            return "to is empty" ;
        }
        for(int i=0 ; i< toArr.length ; i++){
            if (! mails.existemail(toArr[i])){
                return (toArr[i]+ " do not exist") ;
            }
        }

        User from = mails.getUser(m.getFrom()) ;
        from.addsend(m);

        for(int i=0 ; i< toArr.length ; i++){
            User to = mails.getUser(toArr[i]) ;
            to.addinbox(m.deepCopy());
        }
        update() ;

        return "done" ;

        // save mails
    }

    public String addcontact(String addcontact)
    {
        String user ;
        String contact ;
        try {
            JSONObject jas = new JSONObject(addcontact) ;
            user = jas.getString("user");
            contact = jas.getString("contact") ;

            User theUser = mails.getUser(user) ;
            if (theUser.addconctact(contact)){
                update() ;
                return "contact added";
            }
            else {
                return "contact do not added";
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return "contact do not added";

        }

    }
    public String editcontact(String contact, String user)
    {
        User theUser = mails.getUser(user) ;
        if(theUser.editcontact(contact)){
            update() ;
            return "contact edited";
        }else
            return "contact do not edited" ;
    }
    public String deletecontact(String contact, String user)
    {
        User theUser = mails.getUser(user) ;
        theUser.deletecontact(contact);
        update() ;
        return "contact deleted";
    }
    private void update(){
        mails.save();
    }


    // File requests


    public String addFolder(String addFolder) {
        try {
            JSONObject jas = new JSONObject(addFolder) ;
            String email = jas.getString("email");
            String name = jas.getString("name") ;

            User user = mails.getUser(email) ;
            user.addFolder(name);
            System.out.println("Done");
            update() ;
            return "Done" ;
        } catch (JSONException e) {
            e.printStackTrace();
            return "Can not add contact" ;
        }
    }

    public String deleteFolder(String deletefolder){
        try {
            JSONObject jas = new JSONObject(deletefolder) ;
            String email = jas.getString("email");
            String name = jas.getString("name") ;

            User user = mails.getUser(email) ;
            user.deleteFolder(name);
            System.out.println("Done");
            update() ;
            return "Done" ;
        } catch (JSONException e) {
            e.printStackTrace();
            return "Can not delete contact" ;
        }
    }

    public String moveFromFolderToFolder(String move){

        try {
            JSONObject jas = new JSONObject(move) ;
            String email = jas.getString("email");
            String firstFolder = jas.getString("from");
            String secondFolder = jas.getString("to") ;
            long ID = jas.getLong("id") ;

            User user = mails.getUser(email) ;
            user.moveFromFolderToFolder(ID, firstFolder,secondFolder);
            System.out.println("Done");
            update() ;
            return "Done" ;
        } catch (Exception e) {
            e.printStackTrace();
            return "Can not delete contact" ;
        }
    }

    public String renameFolder(String email, String oldname, String newname){
        try {
            User user = mails.getUser(email) ;
            user.renameFolder(oldname,newname);
            update() ;
            return "Done" ;
        }catch (Exception e){
            return "Can not rename folder" ;
        }

    }
   public int[] getarraysorted( String body, String foldr, String method)
   {
       return sortt.sorted(body,foldr,method);
   }
   public LinkedList contactsorted(String body)
   {
       sorting sor = new sorting();
     return sor.SORTCONTACT(body);
   }
}
