package com.example.Email.Server.model;
import com.google.gson.Gson;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class Email {
    HashMap<String, User> users = new HashMap<String, User>();
    private static Email single_instance = null;

    // Using Singleton
    public static Email getInstance()
    {
        if (single_instance == null){
            single_instance = new Email();
            single_instance.load();
        }

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

    public void save(){
        String jsonEmail = new Gson().toJson(single_instance) ;
        try {
            System.out.println(jsonEmail);
            new FileWriter("data.json", false).close();

            FileWriter file = new FileWriter("data.json") ;
            file.write(jsonEmail);
            file.flush();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void load(){
        JSONParser jsonParser = new JSONParser();

        try
        {
            FileReader reader = new FileReader("data.json") ;
            //Read JSON file
            JSONObject obj = (JSONObject) jsonParser.parse(reader);
            Gson gson = new Gson();

            single_instance = gson.fromJson(String.valueOf(obj), Email.class );
            System.out.println(single_instance.users);


        }catch (Exception e){
            System.out.println("Fresh Start");
        }

    }



}
