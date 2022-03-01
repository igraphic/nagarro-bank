package com.nagarro.bank.security;

import lombok.Value;

@Value
public class AuthenticationResponseDTO {

    String accessToken;

    BankUser user;

}
