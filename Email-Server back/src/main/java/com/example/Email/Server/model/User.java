package com.example.Email.Server.model;

import com.google.gson.Gson;

import java.util.HashMap;


public  class User implements Ibulider1{

    private product1 user = new product1();
    private Inbox inbox = new Inbox() ;


    @Override
    public void addemail(String value) {

        user.add2("email",value);
    }
    public String getemail(){
        return user.getEmail();
    }
    public String getpass(){
        return user.getPassword();
    }

    @Override
    public void addpassword(String  value) {
        user.add2("password",value);
    }

    public boolean checkPassword (String pas){
        String password = user.getPassword();
        if(password.equals(pas)){
            return true ;
        }else {
            return false ;
        }
    }

    @Override
    public void addinbox(Message m) {
        long ID = inbox.add2Inbox(m) ;

    }

    @Override
    public void addsend(Message m) {
        long ID = inbox.add2sent(m) ;
    }

    @Override
    public void adddelete(long ID) {
        inbox.delete(ID) ;
    }

    @Override
    public void adddraft(Message m) {
        long ID = inbox.add2sent(m) ;
    }

    @Override
    public User getUser() {
        return this;
    }

    public String getMails(){
        HashMap<String, HashMap<Long,Message>> mails = inbox.getAllMail() ;
        String mailsSt = new Gson().toJson(mails) ;
        return mailsSt ;
    }

}

