package com.example.Email.Server.model;

import com.fasterxml.jackson.core.JsonProcessingException;

public class director {

    Ibulider1 bulider;
    public  User construct( Ibulider1 bulider, String email, String pas) {
        this.bulider=bulider;

        bulider.addemail(email);
        bulider.addpassword(pas);

        return bulider.getUser();
    }
}
