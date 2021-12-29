package com.example.Email.Server.Filter;

import com.example.Email.Server.model.Message;
import com.example.Email.Server.model.User;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.LinkedList;

public class FilterController {

    public LinkedList<String> search(User user, String folder, String searchBy, String equal){
        HashMap<Long, Message> messages = user.inbox.getFolderMails(folder) ;

        Criteria filter ;
        if(searchBy.equals("receivers")){
            filter = new ReceiversCriteria(equal) ;
        }else {
            filter = new GeneralCriteria(searchBy, equal) ;
        }

        return filter.filter(new LinkedList<Message>( messages.values()) ) ;

    }

    public LinkedList filterToFolder(User user, String folder, String searchBy, String equal, String name){
        HashMap<Long, Message> messages = user.inbox.getFolderMails(folder) ;

        Criteria filter ;
        if(searchBy.equals("receivers")){
            filter = new ReceiversCriteria(equal) ;
        }else {
            filter = new GeneralCriteria(searchBy, equal) ;
        }

        LinkedList<String> filteredIDs =  filter.filter(new LinkedList<Message>( messages.values()) );

        user.addFolder(name);
        for(String ID : filteredIDs){
            user.moveFromFolderToFolder( Long.parseLong(ID), folder, name );
        }

        return user.inbox.getAllFolders() ;

    }


    public LinkedList searchContacts(User user, String searchEqual){
        LinkedList<JSONObject> res = new LinkedList<JSONObject>() ;
        LinkedList<JSONObject> contacts = user.contact.getContacts() ;
        for (JSONObject contact: contacts){
            try {
                if(contact.getString("name").contains(searchEqual)){
                    res.add(contact) ;
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return res ;

    }





}
