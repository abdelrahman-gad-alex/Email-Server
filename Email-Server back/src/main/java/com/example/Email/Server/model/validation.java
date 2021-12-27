package com.example.Email.Server.model;
import java.util.regex.*;
import java.util.*;
public class validation {


    public static boolean isValid(String email )
    {
        System.out.println(email);
        String regex = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regex);

        if (email == null)
            return false;

        Email allEmails = Email.getInstance();
        if(allEmails.existemail(email))
            return false;

        return pattern.matcher(email).matches();
    }

}
