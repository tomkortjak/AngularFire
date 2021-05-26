package app.rest;

import app.models.User;
import app.utilities.JWToken;
import com.fasterxml.jackson.databind.node.ObjectNode;
import exceptions.UnAuthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {
  // JWT configuration that can be adjusted from application.properties
  @Value("${jwt.issuer:HvA}")
  private String issuer;

  @Value("${jwt.pass-phrase:secret info}")
  private String passPhrase;

  @Value("${jwt.duration-of-validity:1200}")
  private int tokenDurationOfValidity;


  @PostMapping("login")
  public ResponseEntity<User> login(@RequestBody ObjectNode loginCredentials) {
    if (loginCredentials.findValue("eMail") != null && loginCredentials.findValue("passWord") != null) {
      String email = loginCredentials.findValue("eMail").textValue();
      String password = loginCredentials.findValue("passWord").textValue();

      String username;
      int iend = email.indexOf("@");

      username = email.substring(0, iend);

      if (username.equals(password)) {
        User user = new User(username, email, password, false);

        JWToken jwToken = new JWToken(username, user.getId(), false);
        String tokenString = jwToken.encode(issuer, passPhrase, tokenDurationOfValidity);

        return ResponseEntity.accepted()
          .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString)
          .body(user);
      } else {
        throw new UnAuthorizedException();
      }
    } else {
      throw new UnAuthorizedException();
    }
  }
}
