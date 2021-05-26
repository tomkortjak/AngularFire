package app.utilities;

import exceptions.UnAuthorizedException;
import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import javax.naming.AuthenticationException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JWToken {

  private static final String JWT_USERNAME_CLAIM = "sub";
  private static final String JWT_USERID_CLAIM = "id";
  private static final String JWT_ADMIN_CLAIM = "admin";

  private String userName = null;
  private Long userId = null;
  private boolean admin = false;

  public JWToken() {
  }

  public JWToken(String userName, Long userId, boolean admin) {
    this.userName = userName;
    this.userId = userId;
    this.admin = admin;
  }

  public String encode(String issuer, String passPhrase, int expiration) {
    Key key = getKey(passPhrase);

    String Token = Jwts.builder()
      .claim(JWT_USERNAME_CLAIM, this.userName)
      .claim(JWT_ADMIN_CLAIM, this.admin)
      .claim(JWT_USERID_CLAIM, this.userId)
      .setIssuer(issuer)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
      .signWith(key, SignatureAlgorithm.HS512)
      .compact();

    return Token;
  }

  public static JWToken decode(String token, String passPhrase) throws AuthenticationException {
    try {
      // Validate the token
      Key key = getKey(passPhrase);
      Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(token);
      Claims claims = jws.getBody();

      if(jws.getBody() == null) {
        throw new AuthenticationException("You're not authorised");
      }

      return new JWToken(
        claims.get(JWT_USERNAME_CLAIM).toString(),
        Long.valueOf(claims.get(JWT_USERID_CLAIM).toString()),
        Boolean.parseBoolean(claims.get(JWT_ADMIN_CLAIM).toString())
      );
    } catch (ExpiredJwtException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
      System.out.println("uio: " + e.getMessage());
      throw new AuthenticationException("uio: " + e.getMessage());
    }
  }

  private static Key getKey(String passPhrase) {
    byte hmacKey[] = passPhrase.getBytes(StandardCharsets.UTF_8);
    Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
    return key;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }
}
