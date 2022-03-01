package com.nagarro.bank.statement;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@AllArgsConstructor
class BankStatement {

    @Getter
    private final Integer id;

    @Getter
    private final Integer accountId;

    @Getter
    private final LocalDate dateField;

    @Getter
    private final Double amount;

    @Getter
    private final String accountNumber;

    BankStatement(Integer id, Integer accountId, String dateField, String amount, String accountNumber) {
        this.id = id;
        this.accountId = accountId;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        this.dateField = LocalDate.parse(dateField, formatter);
        this.amount = Double.parseDouble(amount);
        this.accountNumber = accountNumber;
    }

    boolean hasAccountId(Integer accountId) {
        return Objects.equals(this.accountId, accountId);
    }

    boolean withinDateRange(LocalDate dateFrom, LocalDate dateTo) {
        return (dateField.isEqual(dateFrom) || dateField.isEqual(dateTo))
                || (dateField.isAfter(dateFrom) && dateField.isBefore(dateTo));
    }

    boolean withinAmountRange (Double amountMin, Double amountMax) {
        return (amount >= amountMin && amount <= amountMax);
    }

}
