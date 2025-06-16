using Microsoft.EntityFrameworkCore;
using XPens.Api.Models;

namespace XPens.Api.Data;

public class ExpenseTrackerDbContext : DbContext
{
    public ExpenseTrackerDbContext(DbContextOptions<ExpenseTrackerDbContext> options) : base(options) { }

    public DbSet<Expense> Expenses { get; set; }
    public DbSet<Category> Categories { get; set; }
}
