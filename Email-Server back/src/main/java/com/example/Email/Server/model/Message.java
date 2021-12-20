package com.example.Email.Server.model;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import java.util.HashMap;

public class Message {
    public HashMap <String,String > massageMap = new HashMap<String, String>();

    public Message Message(JSONObject jas){
        try {
            JSONArray arr = jas.names() ;
            for(int i = 0; i<arr.length(); i++){
                String key = arr.getString(i);
                String value = jas.getString (key);
                massageMap.put(key, value) ;
            }

        }catch (JSONException e){
            System.out.println("Error "+e.toString());
        }
        return this ;
    }


    public void setAttr(String attr, String value){
        massageMap.put(attr, value) ;
    }

    public String getAttr(String attr){
        return massageMap.get(attr) ;
    }

}
