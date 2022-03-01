package com.nagarro.bank.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
    @Value("${jwt.secret}")
    private String SECRET;

    @Value("${jwt.expire-after-ms}")
    private int EXPIRE_AFTER;

    public String parseUserName(String token){
        return parseClaim(token, Claims::getSubject);
    }

    private boolean isTokenExpired(String token){
        return parseExpiration(token).before(new Date());
    }
    public Date parseExpiration(String token){
        return parseClaim(token, Claims::getExpiration);
    }

    private <T> T parseClaim(String token, Function<Claims, T> claimsResolver)  {
        return claimsResolver.apply(parseClaims(token));
    }

    private Claims parseClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }

    public String generateToken(UserDetails userDetails){
        return buildToken(Map.of("roles", userDetails.getAuthorities()), userDetails.getUsername());
    }

    private String buildToken(Map<String, Object> claims, String subject) {
        Date issuedAt = new Date(System.currentTimeMillis());
        Date expiration = new Date(System.currentTimeMillis() + EXPIRE_AFTER);

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(issuedAt)
                .setExpiration(expiration).signWith(SignatureAlgorithm.HS256, SECRET).compact();
    }

    public boolean validateToken(String token, UserDetails userDetails){
        return (parseUserName(token).equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
