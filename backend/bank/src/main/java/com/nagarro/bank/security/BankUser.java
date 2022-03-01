package com.nagarro.bank.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Value;

@Value
public class BankUser {

    String username;

    @JsonIgnore
    String password;

    String[] roles;

}
