package app.utilities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.naming.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Set;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {
  // JWT configuration that can be adjusted from application.properties
  @Value("${jwt.pass-phrase:secret info}")
  private String passPhrase;

  // path prefix that will be protected by the authentication filter
  private static final Set<String> SECURE_PATHS = Set.of("/aevents", "/registrations", "/users");

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {

    // get requested path
    String path = request.getServletPath();

    // OPTIONS requests and non-secured area should pass through without check
    if (HttpMethod.OPTIONS.matches(request.getMethod()) ||
      SECURE_PATHS.stream().noneMatch(path::startsWith)) {
      System.out.println(request.getMethod());
      chain.doFilter(request, response);
      return;
    }

    for(Enumeration<String> e = request.getHeaderNames(); e.hasMoreElements();) {
      System.out.println("header: " + e.nextElement());
    }

    System.out.println("method: "+ request.getMethod() + " " + " you should not pass if it is options");

    try {
      JWToken jwToken = null;

      // get the encoded token string from the authorization request header
      String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

      if (encodedToken != null) {
        // remove the bearer initial string
        encodedToken = encodedToken.replace("Bearer ", "");

        // decode the token
        jwToken = JWToken.decode(encodedToken, passPhrase);

//      // Future chain members might use token info (see the example that tries to delete a user)
//      request.setAttribute(tokenInfo.KEY,tokenInfo);
      }

      if (encodedToken == null) {
        // avoid giving clues to the caller (do not say that header is not present, for example)
        throw new AuthenticationException("authentication problem");
      }


      // continues the chain
      chain.doFilter(request, response);
    } catch (AuthenticationException e) {
      // aborts the chain
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");
      return;
    }

  }
}
