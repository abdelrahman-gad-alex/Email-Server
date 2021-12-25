package com.example.Email.Server.model;
import java.util.HashMap;

public class product1 {


        private HashMap<String, String> USER;
        public product1()
        {
            USER= new HashMap<String, String>();
        }


        public  void add2(String method, String properties)
        {
            USER.put(method,properties);
        }
        public String getEmail(){
            return USER.get("email") ;
        }
        public String getPassword(){
            return USER.get("password") ;
        }
}


