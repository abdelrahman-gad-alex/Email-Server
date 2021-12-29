package com.example.Email.Server;
import com.example.Email.Server.Controller.MainController;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class secondtest {


    @Test
    void contextLoads() throws JSONException {
        MainController test = new MainController();
        String ans2= test.Signup("{email:abdelaziz@gmail.com,password:1234567}");
        assertEquals("user is added",ans2);
    }
}
