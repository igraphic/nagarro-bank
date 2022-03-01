package com.nagarro.bank.statement;

import com.nagarro.bank.config.DataSource;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class StatementRepository {

    public static List<BankStatement> findStatements(Integer accountId) {
        List<BankStatement> statements = new ArrayList<>();
        Connection connection = DataSource.getConnection();
        try (PreparedStatement statement = connection.prepareStatement(
                    "SELECT s.id, s.account_id, s.dateField, s.amount, a.account_number FROM statement s INNER JOIN account a on a.id = s.account_id WHERE s.account_id = ?"
            )) {
            statement.setInt(1, accountId);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                statements.add(
                        new BankStatement(
                                resultSet.getInt("id"),
                                resultSet.getInt("account_id"),
                                resultSet.getString("datefield"),
                                resultSet.getString("amount"),
                                resultSet.getString("account_number")
                        )
                );
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }

        return statements;
    }

    public static List<BankAccount> findAllAccounts() {
        List<BankAccount> accounts = new ArrayList<>();
        Connection connection = DataSource.getConnection();
        try (Statement statement = connection.createStatement()) {
            ResultSet resultSet = statement.executeQuery("SELECT * FROM account");
            while (resultSet.next()) {
                accounts.add(
                        new BankAccount(
                                resultSet.getInt("id"),
                                resultSet.getString("account_type"),
                                resultSet.getString("account_number")
                        )
                );
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }

        return accounts;
    }

}
