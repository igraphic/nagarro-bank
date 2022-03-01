package com.nagarro.bank.config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Configuration;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Objects;

public final class DataSource {

    private static Connection connection;

    public static Connection getConnection() {
        if (Objects.isNull(connection)) {
            try {
                connection = DriverManager.getConnection("jdbc:ucanaccess://accountsdb.accdb;memory=true");
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }

        return connection;
    }
}
