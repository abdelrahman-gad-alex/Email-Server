package com.example.Email.Server.Controller;

import com.example.Email.Server.model.Email;
import com.example.Email.Server.model.validation;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/controller")
public class MainController {
    Email user = new Email();
    @GetMapping("/signup")
    public String Signup(@RequestParam String email, @RequestParam String password)
    {
        boolean result;
        validation valid =new validation();
       result= valid.isValid(email);
        if(result==true)
        {
            user.create(email,password);
        }
        else
        {
            return "in valid form for email";
        }
         return "user is added";
    }
    @GetMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password)
    {

        boolean result;


        result= user.validuser(email,password);
        if(result==true)
        {
            return "id will be returned";
        }
        else
        {
            return "in valid ";
        }
    }

}
