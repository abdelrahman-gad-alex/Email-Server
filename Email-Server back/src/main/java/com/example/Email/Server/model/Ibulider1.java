package com.example.Email.Server.model;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface Ibulider1 {



    void addemail(String method, String value);
    void addpassword(String method, String value);
    void addinbox(String method, String value);
    void addsend(String method,String  value);
    void  adddelete(String method,String  value);
    void  adddraft(String method,String  value);
     product1 getproduct();
}
