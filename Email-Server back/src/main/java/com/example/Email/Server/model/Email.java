package com.example.Email.Server.model;
import java.util.HashMap;
import java.util.Map;


public class Email {
    HashMap<String, String> Users = new HashMap<String, String>();

        // setter
       public String create( String email , String password)
       {
          Users.put(email,password);
           System.out.println(Users);
          return "user added";
       }

    public boolean validuser( String email ,String password)
    {

        System.out.println(Users);
        int count=1;
        for(Map.Entry<String,String> it: Users.entrySet())
        {

            if(count==Users.size())
            {
                System.out.println(it.getKey());
                System.out.println(email);
                System.out.println(password);
                System.out.println(it.getValue());
                if(email.equals(it.getKey()) && password.equals(it.getValue())  )
                {
                     return true;
                }

            }

          count++;
        }
           return false;
    }



}
