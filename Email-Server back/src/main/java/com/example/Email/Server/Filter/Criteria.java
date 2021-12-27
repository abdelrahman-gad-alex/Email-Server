package com.example.Email.Server.Filter;

import com.example.Email.Server.model.Message;

import java.util.LinkedList;

public interface Criteria {
    LinkedList<String> filter(LinkedList<Message> mails) ;
}
