package com.example.Email.Server.Filter;

import com.example.Email.Server.model.Message;

import java.util.LinkedList;

public class ReceiversCriteria implements Criteria{

    String compere ;
    public ReceiversCriteria(String equal){
        compere = equal ;
    }

    @Override
    public LinkedList<String> filter(LinkedList<Message> mails){
        LinkedList<String> res =  new LinkedList<String>() ;
        for(Message m: mails){
            String[] to = m.getTo() ;
            for (String receiver: to){
                if(receiver.contains(compere)){
                    res.add(m.getAttr("id")) ;
                    break;
                }
            }
        }
        return res ;
    }

}
