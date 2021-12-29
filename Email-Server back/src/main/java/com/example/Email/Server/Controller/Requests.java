package com.example.Email.Server.Controller;

import com.example.Email.Server.model.User;
import com.github.fge.jsonschema.core.exceptions.ProcessingException;
import com.google.gson.Gson;
import org.json.JSONException;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

@RestController
@EnableWebMvc
@CrossOrigin
@RequestMapping("/controller")
public class Requests {
    MainController controller = new MainController() ;
    User user = new User();

    @PostMapping("/signup")
    public String SignupRequest(@RequestBody String email) throws JSONException {

        return new Gson().toJson(controller.Signup(email));

    }

    @GetMapping("/login")
    public String loginRequest(@RequestParam String email, @RequestParam String password) {

        return controller.login(email, password);
    }

    @PostMapping("/sendEmail")
    public String sendRequest(@RequestBody String mail) throws IOException, ProcessingException {
        System.out.println(mail);
        File FLE = new File("src/main/java/com/example/Email/Server/model/email.json");
        try (FileWriter FILE = new FileWriter(FLE)) {
            FILE.write(mail);
            FILE.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
        File schemaFile = new File("src/main/java/com/example/Email/Server/model/schema.json");
        if (ValidationUtils.isJsonValid(schemaFile, FLE)) {
            System.out.println("Valid!");
            FLE.delete();

        } else {
            System.out.println("NOT valid!");
            FLE.delete();
            return new Gson().toJson("invalid content of email");
        }
        return new Gson().toJson(controller.sendEmail(mail));
    }


    @DeleteMapping("/deleteEmail")
    public String deleteEmail(@RequestParam String user, @RequestParam String folder, @RequestParam String[] ID) {
        return controller.deleteEmail(user, folder, ID);
    }


  
    @PostMapping("/draftEmail")
    public String draftReqest(@RequestBody String mail) throws IOException,ProcessingException {
        System.out.println(mail);
        File FLE = new File("src/main/java/com/example/Email/Server/model/email.json");
        try (FileWriter FILE = new FileWriter(FLE)){
            FILE.write(mail);
            FILE.flush();
        }catch (IOException e)
        {
            e.printStackTrace();
        }
        File schemaFile = new File("src/main/java/com/example/Email/Server/model/schema.json");
        if (ValidationUtils.isJsonValid(schemaFile, FLE)){
            System.out.println("Valid!");
            FLE.delete();

        }else{
            System.out.println("NOT valid!");
            FLE.delete();
            return new Gson().toJson("invalid content of email")  ;
        }
        return new Gson().toJson(controller.draftEmail(mail))  ;
    }

      @PostMapping("/addcontact")
    public String addcontact(@RequestBody String addcontact) {
        return new Gson().toJson(controller.addcontact(addcontact));
    }


    @GetMapping("/editcontact")
    public String editcontact(@RequestParam String user,@RequestParam String oldname,@RequestParam String newname, @RequestParam String[] emails) {
        return controller.editcontact(user, oldname, newname, emails);
    }

    @DeleteMapping("/deletecontact")
    public String deletecontact(@RequestParam String user, @RequestParam String name) {
        return controller.deletecontact(user, name);
    }


    //for files

    @PostMapping("/addfolder")
    public String addFolder(@RequestBody String addFolder) throws JSONException {
        return new Gson().toJson(controller.addFolder(addFolder));
    }

    @DeleteMapping("/deletefolder")
    public String deletefolder(@RequestParam String email,@RequestParam String name) {
        return new Gson().toJson(controller.deleteFolder(email, name));
    }

    @PostMapping("/movemailtofolder")
    public String move(@RequestBody String move) {
        return new Gson().toJson(controller.moveFromFolderToFolder(move));
    }

    @GetMapping("/renamefolder")
    public String renameFolder(@RequestParam String email, @RequestParam String oldname, @RequestParam String newname) {
        return controller.renameFolder(email, oldname, newname);
    }

    // for sorting
 @GetMapping("/sort")
    public String sort(@RequestParam String body, @RequestParam String foldr, @RequestParam String method)
    {
        HashMap<String, Object> tempHM = new HashMap<String, Object>();
        tempHM.put("ans", controller.getarraysorted(body,foldr,method));
        Gson gs = new Gson();
        return gs.toJson(tempHM);
    }

    @GetMapping("/sortcontact")
    public String sortcontacts(@RequestParam String body) {
        return new Gson().toJson(controller.contactsorted(body));
    }

    @GetMapping("/search")
    public String searchEmails(@RequestParam String user, @RequestParam String folder, @RequestParam String searchBy, @RequestParam String equal) {
        return controller.searchEmails(user, folder, searchBy, equal);
    }

    @GetMapping("/filter")
    public String filterToFolder(@RequestParam String user, @RequestParam String folder, @RequestParam String searchBy, @RequestParam String equal, @RequestParam String name) {
        return controller.filterToFolder(user, folder, searchBy, equal, name);
    }

    @GetMapping("/searchcontact")
    public String searchContacts(@RequestParam String user, @RequestParam String searchEqual) {
        return controller.searchContacts(user, searchEqual);
    }

    public static final String Directory = System.getProperty("user.home") + "/Downloads/uploads";


    @PostMapping("/sendfile")
    public void uploadFile(@RequestParam("file") MultipartFile[] files) {
        String message = "";
        try {
            System.out.println(files[0].getOriginalFilename());
            controller.sendFiles(files) ;

            message = "Uploaded the file successfully: " + files[0].getOriginalFilename();
            System.out.println(files);
        } catch (Exception e) {
            System.out.println("error");

        }
    }

    @GetMapping("/getfiles")
    public ResponseEntity<UrlResource> getFiles (@RequestParam String fileName){
        Path paths = controller.getfiles(fileName) ;
        try {
            UrlResource resource = new UrlResource(paths.toUri());
            HttpHeaders httpHeaders = new HttpHeaders() ;
            httpHeaders.add("File-Name", fileName);
            httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;File-Name="+resource.getFilename());
            return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(paths))).headers(httpHeaders).body( resource) ;
        } catch (Exception e) {
            e.printStackTrace();
            return null ;
        }
    }




}
