package com.example.Email.Server.model;

import com.google.gson.Gson;
import org.json.simple.JSONObject;
import org.json.JSONException;
//import org.json.JSONObject;
import java.util.LinkedList;


public  class User implements Ibulider1{

    private product1 user = new product1();
    public Inbox inbox = new Inbox() ;
    public contacts contact =new contacts();

     @Override
    public void addemail(String value) {
        user.add2("email",value);
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


    // get main data
    public String getemail(){
        return user.getEmail();
    }
    public String getpass(){
        return user.getPassword();
    }

    //contacts
    public boolean addconctact(String jsonContact)
    {
       return contact.addcontact(jsonContact);
    }
    public boolean editcontact( String oldname, String newname, String[] emails)
    {
        return contact.editcontact(oldname, newname, emails);
    }
    public void deletecontact(String name)
    {
        contact.deletecontact(name);
    }




    // add emails
    @Override
    public void addinbox(Message m) {
        long ID = inbox.addMessage2Folder(m, "inbox") ;
        System.out.println("message relieved in "+user.getEmail());

    }

    @Override
    public void addsend(Message m) {
        long ID = inbox.addMessage2Folder(m, "sent") ;
        System.out.println("message sent from "+user.getEmail());
    }

    @Override
    public void deleteMessage(long ID, String folder) {
        inbox.delete(ID, folder) ;
    }

    @Override
    public void adddraft(Message m) {
        long ID = inbox.addMessage2Folder(m, "draft");
     }


     // for folders


    public void addFolder(String name) {
        inbox.addFolder(name);
    }

    public void deleteFolder(String name){
         inbox.deleteFolder(name);
    }

    public void moveFromFolderToFolder(long ID, String firstFolder, String secondFolder){
         inbox.moveMessage(secondFolder, ID, firstFolder);
    }

    public void renameFolder(String oldname, String newname){
         inbox.renameFolder(oldname,newname);
    }

    @Override
    public User getUser() {
        return this;
    }

    public String gerUserData(){
        LinkedList mails = inbox.getAllMail() ;
        LinkedList folders = inbox.getAllFolders() ;

        JSONObject obj = new JSONObject() ;
        try {
            obj.put("mails", mails) ;
            obj.put("folders", folders) ;
            obj.put("contacts", contact.getContacts()) ;
        } catch (Exception e) {
            e.printStackTrace();
        }



        String mailsSt = new Gson().toJson(obj) ;
        System.out.println(mails);
                //new Gson().toJson(mails) ;
        return mailsSt ;
    }


}

