package com.example.Email.Server.Filter;

import com.example.Email.Server.model.Message;

import java.util.LinkedList;

public class GeneralCriteria implements Criteria{
    String compere ;
    String key ;
    public GeneralCriteria(String attribute, String equal){
        key = attribute ;
        compere = equal ;
    }

    @Override
    public LinkedList<String> filter(LinkedList<Message> mails){
        LinkedList<String> res =  new LinkedList<String>() ;
        for(Message m: mails){
            String value = m.getAttr(key) ;
            if(value.contains(compere)){
                res.add(m.getAttr("id")) ;
            }

        }
        return res ;
    }

}
