package com.example.Email.Server.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;


public class Inbox {

    long ID=0 ;

    HashMap<String,Folder>  folders = new HashMap<String,Folder>() ;
    HashMap<Long,Message>  allMails = new HashMap<Long,Message>() ;
    HashMap<Long,Date> deleteddate = new HashMap<Long,Date>() ;

    public Inbox(){
        folders.put("inbox", new Folder("inbox")) ;
        folders.put("allMails", new Folder("allMails")) ;
        folders.put("sent", new Folder("sent")) ;
        folders.put("draft", new Folder("draft")) ;
        folders.put("trash", new Folder("trash")) ;
    }

    // For folders
    public long addMessage2Folder(Message message, String name){
        message.setAttr("id",Long.toString(ID));
        allMails.put(ID, message) ;
        folders.get(name).addMessage(ID);
        folders.get("allMails").addMessage(ID);

        ID += 1 ;
        return ID-1 ;
    }

    public void moveMessage(String toFolder, long ID, String oldFolder){
        folders.get(oldFolder).removeMessage(ID);
        folders.get(toFolder).addMessage(ID);
        if(oldFolder.equals("trash")){
            deleteddate.remove(ID) ;
        }
    }

    // delete message from folder
    public boolean delete(long ID, String folder){
        Message m = allMails.get(ID) ;
        if(m==null){
            return false ;
        }
        if(folder.equals("trash")){
            if(folders.get(folder).haveMessage(ID)){
                folders.get(folder).removeMessage(ID);
                allMails.remove(ID) ;
                deleteddate.remove(ID) ;
                return true ;
            }
            return false ;
        }
        if(folders.get(folder).haveMessage(ID)){
            folders.get(folder).removeMessage(ID);
            folders.get("allMails").removeMessage(ID);
            System.out.println(ID);
            System.out.println("in delete");
            folders.get("trash").addMessage(ID);
            deleteddate.put(ID,new Date()) ;
            return true ;
        }
        return false ;
    }


    public void addFolder(String name){
        Folder folder = new Folder(name) ;
        folders.put(name, folder) ;
    }

    public void deleteFolder(String name){
        Folder folder =  folders.get(name) ;
        folder = null ;
        folders.remove(name) ;
    }

    public void renameFolder(String oldname, String newname){
        Folder folder = folders.get(oldname);
        folder.rename(newname);

        folders.remove(oldname) ;
        folders.put(newname, folder) ;

    }



    public LinkedList getAllMail(){
        //checkTimeForTrash() ;

        return new LinkedList<>(allMails.values()) ;
    }

    public LinkedList getAllFolders(){
        return new LinkedList<>(folders.values()) ;
    }

    void checkTimeForTrash(){
        Date todayDate = new Date() ;
        System.out.println(todayDate);
        //2017-01-23
        for(long ID: deleteddate.keySet()){
            long diff = todayDate.getTime() - deleteddate.get(ID).getTime();
            long diffDays = diff / (24 * 60 * 60 * 1000);

            if(diffDays>30){
                folders.get("trash").removeMessage(ID);
                allMails.remove(ID) ;
                deleteddate.remove(ID) ;
            }

        }
    }

    public HashMap<Long,Message> getFolderMails (String folderName){
        LinkedList<Long> folder = folders.get(folderName).id ;

        HashMap<Long,Message> res = new HashMap<Long,Message>() ;

        for(Long Id : folder){
            res.put(Id, allMails.get(Id)) ;
        }

        return res ;


    }
    public Message getMessage(Long ID){
        return allMails.get(ID) ;
    }






}
