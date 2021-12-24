package com.example.Email.Server.model;
import java.util.HashMap;
import java.util.Map;


public class Email {
    HashMap<String, User> users = new HashMap<String, User>();
    private static Email single_instance = null;

    // Using Singleton
    public static Email getInstance()
    {
        if (single_instance == null)
            single_instance = new Email();

        return single_instance;
    }

        // setter
    public void add( String email , User user){
        System.out.println(user.getemail());
        System.out.println(user.getpass());

        users.put(email, user) ;
    }

    public boolean existUser( String email ,String password)
    {

        User user = users.get(email);
        if(user == null){
            System.out.println("User not exist");
            return false ;
        }
        if(!user.checkPassword(password)){
            System.out.println("pas not exist");

            return false ;
        }
        return true ;

    }

    public boolean existemail( String email)
    {
        User user = users.get(email);
        if(user == null){
            return false ;
        }

        return true ;

    }

    public User getUser(String email){
           return users.get(email) ;
    }

    public void removeUser(String email){
        users.remove(email) ;
    }

    public void print(){
        for (String name: users.keySet()) {
            User value = users.get(name);
            String e = value.getemail();
            String pas = value.getpass();

            System.out.println(e + " " + pas);
        }
    }


}
