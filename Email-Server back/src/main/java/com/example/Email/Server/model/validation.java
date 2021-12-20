package com.example.Email.Server.model;
import java.util.regex.*;
import java.util.*;
public class validation {


    public static boolean isValid(String email)
    {
        String regex = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        if (email == null)
            return false;
        return pattern.matcher(email).matches();
    }

}
