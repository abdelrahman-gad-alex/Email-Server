package com.example.Email.Server.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
//user
import java.util.HashMap;

public  class Inbox implements Ibulider1{

    private product1 Product = new product1();
    HashMap<Long,String > Inbox = new HashMap<Long, String>();
    HashMap<Long,String > sent = new HashMap<Long, String>();
    HashMap<Long,String > deleted = new HashMap<Long, String>();
    public String object;
    public int id;

    @Override
    public void addemail(String method, String value) {
        Product.add2(method,value);
    }

    @Override
    public void addpassword(String method, String  value) {
        Product.add2(method,value);
    }

    @Override
    public void addinbox(String method, String value) {


        Product.add2(method,value);
    }

    @Override
    public void addsend(String method, String value) {
        Inbox.put("subject","")
        Product.add2(method,value);
    }

    @Override
    public void adddelete(String method, String  value) {

        Product.add2(method,value);
    }

    @Override
    public void adddraft(String method, String  value) {

        Product.add2(method,value);
    }

    @Override
    public product1 getproduct() {
        return Product;
    }
}
