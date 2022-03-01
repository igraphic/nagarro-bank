package com.nagarro.bank.security;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class BankUserDetailService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final Map<String, BankUser> users = Map.of(
            "admin", new BankUser("admin", passwordEncoder.encode("admin"), new String[] {"Admin"}),
            "user", new BankUser("user", passwordEncoder.encode("user"), new String[] {"User"})
    );

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       BankUser user = getUserByUsername(username);
        return new User(user.getUsername(), user.getPassword(),
                AuthorityUtils.createAuthorityList(user.getRoles()));
    }

    BankUser getUserByUsername(String username) throws UsernameNotFoundException {
        return users.get(username);
    }
}

