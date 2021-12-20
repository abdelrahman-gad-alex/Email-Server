package com.example.Email.Server.model;

import com.fasterxml.jackson.core.JsonProcessingException;

public class director {

    Ibulider1 bulider;
    public  void construct( Ibulider1 bulider) throws JsonProcessingException {
          this.bulider=bulider;
          bulider.addsubject("subject","gamed");
        bulider.addto("subject","gamed");
        bulider.addname("subject","gamed");
        bulider.addimportant("subject","gamed");
        bulider.adddate("subject","gamed");
        bulider.addemail("subject","yla");
        bulider.generateid();
        bulider.convertjason();
        bulider.addproperties();
    }
}
