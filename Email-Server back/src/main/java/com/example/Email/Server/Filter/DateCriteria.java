package com.example.Email.Server.Filter;

import com.example.Email.Server.model.Message;

import java.util.LinkedList;

public class DateCriteria implements Criteria{

    String compere ;
    public DateCriteria(String equal){
        compere = equal ;
    }

    @Override
    public LinkedList<String> filter(LinkedList<Message> mails){
        return new LinkedList<String>() ;
    }

}
