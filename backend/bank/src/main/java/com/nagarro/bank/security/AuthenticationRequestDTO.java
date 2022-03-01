package com.nagarro.bank.security;

import lombok.Value;

@Value
public class AuthenticationRequestDTO {

    String username;

    String password;

}
