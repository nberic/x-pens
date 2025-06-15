namespace XPens.Api.Models;

public class Expense
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int CategoryId { get; set; }
    public string? Note { get; set; }
    public Category? Category { get; set; }
}
