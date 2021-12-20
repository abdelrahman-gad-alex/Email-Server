package com.example.Email.Server.Controller;

import com.example.Email.Server.model.*;
import org.json.JSONObject;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;


public class MainController {
    Email mails = new Email();
    director Direct = new director();

    public String Signup(String email, String password)
    {
        boolean result;
        validation valid =new validation();
       result= valid.isValid(email,mails);
        if(result==true)
        {
            User user = new User();
            user = Direct.construct(user , email, password) ;
            mails.add(email, user);

        }
        else
        {
            return "in valid form for email";
        }
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

}
