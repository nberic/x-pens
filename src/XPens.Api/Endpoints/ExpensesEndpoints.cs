using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using XPens.Api.Data;
using XPens.Api.Models;
using XPens.Api.DTOs;

namespace XPens.Api.Endpoints
{
    public static class ExpensesEndpoints
    {
        public static void MapExpensesEndpoints(IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/expenses");

            group.MapGet("/", async (ExpenseTrackerDbContext db) =>
                await db.Expenses.ToListAsync()
            );

            group.MapGet("/{id:int}", async (int id, ExpenseTrackerDbContext db) =>
                await db.Expenses.FindAsync(id)
                    is Expense expense ? Results.Ok(expense) : Results.NotFound()
            );

            group.MapPost("/", async (ExpenseDto dto, ExpenseTrackerDbContext db) =>
            {
                var expense = new Expense
                {
                    Amount = dto.Amount,
                    Date = dto.Date,
                    CategoryId = dto.CategoryId,
                    Note = dto.Note
                };
                db.Expenses.Add(expense);
                await db.SaveChangesAsync();
                return Results.Created($"/api/expenses/{expense.Id}", expense);
            });

            group.MapPut("/{id:int}", async (int id, ExpenseDto dto, ExpenseTrackerDbContext db) =>
            {
                var expense = await db.Expenses.FindAsync(id);
                if (expense is null) return Results.NotFound();
                expense.Amount = dto.Amount;
                expense.Date = dto.Date;
                expense.CategoryId = dto.CategoryId;
                expense.Note = dto.Note;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            group.MapDelete("/{id:int}", async (int id, ExpenseTrackerDbContext db) =>
            {
                var expense = await db.Expenses.FindAsync(id);
                if (expense is null) return Results.NotFound();
                db.Expenses.Remove(expense);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}
