package com.example.Email.Server.Controller;

import com.example.Email.Server.model.Ibulider1;
import com.example.Email.Server.model.User;
import com.example.Email.Server.model.validation;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/controller")

public class Requests {
    MainController controller = new MainController() ;
     User user =new User();

    @GetMapping("/signup")
    public String SignupRequest(@RequestParam String email, @RequestParam String password)
    {
        return controller.Signup(email, password) ;
    }
    @GetMapping("/login")
    public String loginRequest(@RequestParam String email, @RequestParam String password)
    {
        return controller.login(email, password) ;
    }

    @GetMapping("/sendEmail")
    public String sendRequest(@RequestParam String mail)
    {
        return controller.sendEmail(mail) ;
    }
    @GetMapping("/addcontact")
    public String addcontact(@RequestParam String contact,@RequestParam String email )
    {
         return controller.addcontact(contact, email) ;
    }
    @GetMapping("/editcontact")
    public String editcontact(@RequestParam String contact, @RequestParam String email)
    {
        return controller.editcontact(contact, email) ;
    }
    @GetMapping("/deletecontact")
    public String deletecontact(@RequestParam String contact, @RequestParam String email)
    {
        return controller.deletecontact(contact, email) ;
    }

}
