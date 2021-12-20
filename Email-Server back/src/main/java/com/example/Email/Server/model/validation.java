package com.example.Email.Server.model;
import java.util.regex.*;
import java.util.*;
public class validation {


    public static boolean isValid(String email , Email allEmails)
    {
        String regex = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regex);

        if (email == null)
            return false;
        if(allEmails.existemail(email))
            return false;
        return pattern.matcher(email).matches();
    }

}
