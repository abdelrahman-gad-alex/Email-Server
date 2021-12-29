package com.example.Email.Server;

import com.example.Email.Server.Controller.MainController;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class thirdtest {
    @Test
    void contextLoads() throws JSONException {
        MainController test = new MainController();
        String ans2= test.deleteEmail("abdelaziz@gmail.com","Inbox", new String[]{"[1,2,3]"});
        assertEquals("Error",ans2);
    }
}
