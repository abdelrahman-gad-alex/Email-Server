package com.example.Email.Server.model;

import org.json.JSONException;
import org.json.JSONObject;

import org.json.simple.parser.JSONParser;
import org.json.JSONArray;
import org.json.simple.parser.ParseException;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import javax.mail.Multipart;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.LinkedList;

import static java.nio.file.Files.copy;


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

    public void setAttachments(MultipartFile[] files){
            try {
                for(MultipartFile file : files) {
                    //File save = new File("files/"+file.getOriginalFilename()) ;
                    String fileName = StringUtils.cleanPath(file.getOriginalFilename()) ;
                    Path filePath = Paths.get("files/" , fileName).toAbsolutePath().normalize()  ;
                    file.transferTo(filePath);
                    System.out.println(file.getName());
                }
            } catch (Exception e) {
                System.out.println("Error in writing files");
                e.printStackTrace();
            }



    }


    public String[] getAttachNames(){
        String[] attachNames = new String[0] ;
        if(massageMap.get("file")==null){
            return  null;
        }
        try {
            JSONArray arr = new JSONArray(massageMap.get("file")); ;
            attachNames = new String[arr.length()] ;
            for(int i = 0; i<arr.length(); i++){
                attachNames[i] = arr.getString(i) ;
            }
            System.out.println(attachNames.length);

        }catch (JSONException  e){
            System.out.println("Error "+e.toString());
        }
        return attachNames ;
    }

    public void setAttr(String attr, String value){
        massageMap.put(attr, value) ;
    }

    public String getAttr(String attr){
        if(attr.equals("mailContent")){
            return getEmailContent() ;
        }

        return massageMap.get(attr) ;
    }

}
