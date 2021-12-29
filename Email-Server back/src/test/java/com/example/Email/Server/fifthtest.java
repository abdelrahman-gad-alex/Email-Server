package com.example.Email.Server;
import com.example.Email.Server.Controller.MainController;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;
public class fifthtest {
    @Test
    void contextLoads() throws JSONException {
        MainController test = new MainController();
        String ans2= test.deletecontact("abdelaziz@gmail.com","fox");
        assertEquals("contact deleted",ans2);
    }
}
