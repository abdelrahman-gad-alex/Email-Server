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

}
