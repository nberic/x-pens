namespace XPens.Api.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Color { get; set; }
    public ICollection<Expense>? Expenses { get; set; }
}
