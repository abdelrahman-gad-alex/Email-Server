package com.example.Email.Server.Controller;

import com.example.Email.Server.model.Ibulider1;
import com.example.Email.Server.model.User;
import com.example.Email.Server.model.validation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@RestController
@EnableWebMvc
@CrossOrigin

public class Requests {
    MainController controller = new MainController() ;
     User user =new User();

    @PostMapping ("/signup")
    public String SignupRequest(@RequestBody String email, @RequestBody String password)
    {
        return controller.Signup(email, password) ;
    }
    @PostMapping ("/login")
    public String loginRequest(@RequestBody String email, @RequestBody String password)
    {
        return controller.login(email, password) ;
    }

    @PostMapping("/sendEmail")
    public String sendRequest(@RequestBody String mail)
    {
        return controller.sendEmail(mail) ;
    }
    @PostMapping ("/addcontact")
    public String addcontact(@RequestBody String contact,@RequestBody String email )
    {
         return controller.addcontact(contact, email) ;
    }
    @PostMapping ("/editcontact")
    public String editcontact(@RequestBody String contact, @RequestBody String email)
    {
        return controller.editcontact(contact, email) ;
    }
    @GetMapping("/deletecontact")
    public String deletecontact(@RequestParam String contact, @RequestParam String email)
    {
        return controller.deletecontact(contact, email) ;
    }

}
