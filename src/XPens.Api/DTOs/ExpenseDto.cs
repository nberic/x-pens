namespace XPens.Api.DTOs;

public record ExpenseDto(
    int Id,
    decimal Amount,
    DateTime Date,
    int CategoryId,
    string? Note
);
