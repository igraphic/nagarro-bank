package com.nagarro.bank.statement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accounts")
public class StatementController {

    @Autowired
    StatementService statementService;

    @GetMapping
    List<BankAccount> getAccounts() {
        return statementService.getAccounts();
    }

    @GetMapping("/{accountId}/statements")
    List<BankStatement> getStatement(@PathVariable Integer accountId) {
        return statementService.getThreeMonthStatements(accountId);
    }

    @GetMapping("/{accountId}/statements/query")
    @PreAuthorize("hasAuthority('Admin')")
    List<BankStatement> getStatement(
            @PathVariable Integer accountId,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> endDate,
            @RequestParam("minAmount") Optional<Double> minAmount,
            @RequestParam("maxAmount") Optional<Double> maxAmount
    ) {
        return statementService.getStatementsWithinDateAmountRange(accountId, startDate, endDate, minAmount, maxAmount);
    }
}
