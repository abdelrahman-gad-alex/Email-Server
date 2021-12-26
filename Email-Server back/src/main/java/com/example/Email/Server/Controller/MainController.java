package com.example.Email.Server.Controller;

import com.example.Email.Server.model.*;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;
import org.json.*;

public class MainController {
    Email mails = Email.getInstance();
    director Direct = new director();

    public String Signup(String email) throws JSONException {
        JSONObject json = new JSONObject(email);
        String Email  =  json.getString("email");
        String password  =  json.getString("password");
        System.out.println(Email);
        boolean result;
        validation valid =new validation();
       result= valid.isValid(Email);
        if(result==true)
        {
            User user = new User();
            user = Direct.construct(user , Email, password) ;
            mails.add(Email, user);

        }
        else
        {
            return "in valid form for email";
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
            return mails.getUser(email).getMails() ;
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
            to.addinbox(m);
        }
        update() ;

        return "done" ;

        // save mails
    }

    public String addcontact(String contact, String user)
    {
        User theUser = mails.getUser(user) ;
        if (theUser.addconctact(contact)){
            update() ;
            return "contact added";
        }
        else {
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

}
