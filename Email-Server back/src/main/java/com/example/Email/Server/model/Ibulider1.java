package com.example.Email.Server.model;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.HashMap;

public interface Ibulider1 {



    void addemail(String value);
    void addpassword(String value);
    void addinbox(Message message);
    void addsend(Message message);
    void  adddelete(long ID, String folder);
    void  adddraft(Message message);
    User getUser();
}

