package com.example.Email.Server.Controller;

import com.example.Email.Server.model.Ibulider1;
import com.example.Email.Server.model.User;
import com.example.Email.Server.model.validation;
import com.google.gson.Gson;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.json.JSONObject;

import java.util.HashMap;

@RestController
@EnableWebMvc
@CrossOrigin

public class Requests {
    MainController controller = new MainController() ;
     User user =new User();

    @PostMapping ("/signup")
    public String SignupRequest(@RequestBody String email) throws JSONException {
        String temp = controller.Signup(email);
        System.out.println(temp);
        HashMap<String, String> tempHM = new HashMap();
        tempHM.put("res", temp);
        Gson gson = new Gson();
        return gson.toJson(tempHM);
    }
    @PostMapping ("/login")
    public String loginRequest(@RequestBody String email, @RequestBody String password)
    {

        return  controller.login(email, password);
    }

    @PostMapping("/sendEmail")
    public String sendRequest(@RequestBody String mail)

    {
        String temp = controller.sendEmail(mail);
        System.out.println(temp);
        HashMap<String, String> tempHM = new HashMap();
        tempHM.put("res", temp);
        Gson gson = new Gson();
        return gson.toJson(tempHM);
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
