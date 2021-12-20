package com.example.Email.Server;

import com.example.Email.Server.model.Ibulider1;
import com.example.Email.Server.model.Inbox;
import com.example.Email.Server.model.director;
import com.example.Email.Server.model.product1;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmailServerApplication {

	public static void main(String[] args) throws JsonProcessingException {


		director Direct = new director();
		Ibulider1 inboxbulid = new Inbox();
		Direct.construct(inboxbulid);
         product1 car = inboxbulid.getproduct();
		 System.out.println(car);
 	}

}
