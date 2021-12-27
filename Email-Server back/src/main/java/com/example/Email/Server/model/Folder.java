package com.example.Email.Server.model;

import java.util.LinkedList;

public class Folder {
    String name ;
    public LinkedList<Long> id ;

    public Folder(String TheName){
        name = TheName ;
        id = new LinkedList<Long>() ;
    }

    public String name(){
        return name ;
    }

    public void rename(String newName){
        name = newName ;
    }

    public void addMessage(long ID){
        id.add(ID) ;
    }

    public void removeMessage(long ID){
        id.remove(id.indexOf(ID)) ;
    }

    public boolean haveMessage(long ID){
        return id.contains(ID) ;
    }
    public int getlength(){
        return id.size() ;
    }




}
