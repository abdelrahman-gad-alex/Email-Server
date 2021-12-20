package com.example.Email.Server.model;

import java.util.HashMap;



public class Inbox {

    long ID=0 ;
    public HashMap<Long,Message > Inbox = new HashMap<Long, Message>();
    public HashMap<Long,Message > sent = new HashMap<Long, Message>();
    public HashMap<Long,Message > draft = new HashMap<Long, Message>();
    public HashMap<Long,Message > deleted = new HashMap<Long, Message>();

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

    public boolean delete(long ID){
        Message m = Inbox.get(ID) ;
        if(m == null){

            m = sent.get(ID) ;
            if (m== null){

                m = draft.get(ID) ;
                if (m==null){
                    return false ;
                }
                draft.remove(ID) ;

            }else {
                sent.remove(ID) ;
            }
        }else {
            Inbox.remove(ID) ;
        }

        deleted.put(ID, m) ;
        return true ;
    }

    public HashMap<String,HashMap<Long,Message>> getAllMail(){
        HashMap<String,HashMap<Long,Message > > allmails = new HashMap<String,HashMap<Long,Message >>() ;
        allmails.put("inbox", Inbox) ;
        allmails.put("sent", sent) ;
        allmails.put("draft", draft) ;
        allmails.put("deleted", deleted) ;

        return allmails ;


    }





}
