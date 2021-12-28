package com.example.Email.Server.model;

import org.json.JSONException;
import org.json.JSONObject;

import org.json.simple.parser.JSONParser;
import org.json.JSONArray;
import org.json.simple.parser.ParseException;


import java.util.HashMap;

public class Message {
    public HashMap <String,String > massageMap = new HashMap<String, String>();
    private String jsonObject ;

    public Message (String jasString) {
        jsonObject = jasString ;

        try {
            JSONObject jas = new JSONObject(jasString);

            JSONArray arr = jas.names() ;
            for(int i = 0; i<arr.length(); i++){
                String key = arr.getString(i);
                String value = jas.getString (key);
                massageMap.put(key, value) ;
            }

        }catch (JSONException  e){
            System.out.println("Error "+e.toString());
        }
    }

    // Prototype
    public Message deepCopy(){
        Message copy = new Message(jsonObject) ;
        return copy ;
    }

    public String[] getTo(){
        if(massageMap.get("to")==null){
            return null ;
        }
        try {
            JSONArray arr = new JSONArray(massageMap.get("to")); ;
            String[] to = new String[arr.length()] ;
            for(int i = 0; i<arr.length(); i++){
                to[i] = arr.getString(i) ;
            }

            return to ;

        }catch (JSONException  e){
            System.out.println("Error "+e.toString());
        }
        return null ;
    }

    public String getFrom(){
        return massageMap.get("from") ;
    }

    public String getEmailContent(){
        String content = massageMap.get("emailContent");
        content.replaceAll("<p>","");
        content.replaceAll("</p>","");
        content.replaceAll("<h1>","");
        content.replaceAll("</h1>","");
        content.replaceAll("<h2>","");
        content.replaceAll("</h2>","");
        content.replaceAll("<h3>","");
        content.replaceAll("</h3>","");
        content.replaceAll("<h4>","");
        content.replaceAll("</h4>","");
        content.replaceAll("</h5>","");
        content.replaceAll("<h5>","");
        content.replaceAll("<h6>","");
        content.replaceAll("</h6>","");

        return content;
    }


    public void setAttr(String attr, String value){
        massageMap.put(attr, value) ;
    }

    public String getAttr(String attr){
        if(attr.equals("emailContent")){
            return getEmailContent() ;
        }

        return massageMap.get(attr) ;
    }

}
