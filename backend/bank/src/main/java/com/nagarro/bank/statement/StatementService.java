package com.nagarro.bank.statement;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
class StatementService {

    List<BankStatement> getThreeMonthStatements(Integer accountId) {
        return getStatementsWithinDateRange(accountId, Optional.empty(), Optional.empty());
    }

    List<BankStatement> getStatementsWithinDateAmountRange(
            Integer accountId,
            Optional<LocalDate> dateFromOptional,
            Optional<LocalDate> dateToOptional,
            Optional<Double> minAmount,
            Optional<Double> maxAmount
    ) {
        List<BankStatement> statements = getStatementsWithinDateRange(accountId, dateFromOptional, dateToOptional);

        if(minAmount.isPresent()) {
            statements = statements
                    .stream()
                    .filter(statement -> statement.getAmount() >= minAmount.get())
                    .collect(Collectors.toList());
        }

        if(maxAmount.isPresent()) {
            statements = statements
                    .stream()
                    .filter(statement -> statement.getAmount() <= maxAmount.get())
                    .collect(Collectors.toList());
        }

        return statements;
    }

    private List<BankStatement> getStatementsWithinDateRange(
            Integer accountId,
            Optional<LocalDate> dateFromOptional,
            Optional<LocalDate> dateToOptional
    ) {
        LocalDate dateTo = dateToOptional.orElseGet(LocalDate::now);
        LocalDate dateFrom = dateFromOptional.orElseGet(() -> dateTo.minusMonths(3));

        return getAccountStatements(accountId)
                .stream()
                .filter(bankStatement -> bankStatement.withinDateRange(dateFrom, dateTo))
                .collect(Collectors.toList());
    }

    private List<BankStatement> getAccountStatements(Integer accountId) {
        return StatementRepository
                .findStatements(accountId)
                .stream()
                .filter(bankStatement -> bankStatement.hasAccountId(accountId))
                .collect(Collectors.toList());
    }

    public List<BankAccount> getAccounts() {
        return StatementRepository.findAllAccounts();
    }
}
