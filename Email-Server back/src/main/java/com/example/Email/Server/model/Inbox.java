package com.example.Email.Server.model;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;



public class Inbox {

    long ID=0 ;
    public HashMap<Long,Message > Inbox = new HashMap<Long, Message>();
    public HashMap<Long,Message > sent = new HashMap<Long, Message>();
    public HashMap<Long,Message > draft = new HashMap<Long, Message>();
    public HashMap<Long,Message > deleted = new HashMap<Long, Message>();

    public HashMap<String,HashMap<Long,Message >>  folders = new HashMap<String,HashMap<Long,Message >>() ;
    public long add2Inbox(Message message){
        Inbox.put(ID, message) ;

        ID += 1 ;
        return ID-1 ;
    }
    public long add2draft(Message message){
        draft.put(ID, message) ;

        ID += 1 ;
        return ID-1 ;
    }

    public long add2sent(Message message){
        sent.put(ID, message) ;
        ID += 1 ;
        return ID-1 ;
    }

    public void addFolder(String name){
        HashMap<Long,Message > folder = new HashMap<Long,Message >() ;
        folders.put(name, folder) ;
    }

    public void addMessageToFolder(String folder, long ID, String oldFolder){
        HashMap<Long,Message > Thefolder = folders.get(folder);
        Thefolder.put(ID,getMessage(ID, oldFolder)) ;
    }

    private Message getMessage(long ID, String folder){
        return getAllMail().get(folder).get(ID) ;
    }

    public boolean delete(long ID, String folder){
        Message m = getAllMail().get(folder).get(ID) ;
        if(m==null){
            return false ;
        }
        getAllMail().get(folder).remove(ID) ;
        deleted.put(ID, m) ;
        return true ;
    }

    public HashMap<String,HashMap<Long,Message>> getAllMail(){
        HashMap<String,HashMap<Long,Message > > allmails = new HashMap<String,HashMap<Long,Message >>() ;
        allmails.put("inbox", Inbox) ;
        allmails.put("sent", sent) ;
        allmails.put("draft", draft) ;
        allmails.put("deleted", deleted) ;

        allmails.putAll(folders);

        return allmails ;


    }

    void checkTimeForTrash(){
        LocalDate todayDate = java.time.LocalDate.now() ;
        System.out.println(todayDate);
        //2017-01-23

        for(long Id : deleted.keySet()){
            String date = deleted.get(Id).getAttr("date") ;
            LocalDate mdate = LocalDate.parse(date);
            Period period = Period.between(mdate, todayDate);

            if(period.getDays()>30 || period.getMonths() >0 ||period.getYears() >0 ){
                deleted.remove(Id) ;
            }
        }
    }




}
