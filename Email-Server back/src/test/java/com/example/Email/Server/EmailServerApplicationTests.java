package com.example.Email.Server;

import com.example.Email.Server.Controller.MainController;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import static org.junit.Assert.*;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EmailServerApplicationTests {

	@Test
	void contextLoads() throws JSONException {
		MainController test = new MainController();
		String ans= test.login("abdelaiz@gmail.com","1234567");
		assertEquals("invalid ",ans);
		String ans2= test.Signup("{email:abdelaziz@gmail.com,password:1234567}");
		assertEquals("user is added",ans2);


	}


}
