using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using XPens.Api.Data;
using XPens.Api.Models;
using XPens.Api.DTOs;

namespace XPens.Api.Endpoints
{
    public static class CategoriesEndpoints
    {
        public static void MapCategoriesEndpoints(IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/categories");

            group.MapGet("/", async (ExpenseTrackerDbContext db) =>
                await db.Categories.ToListAsync()
            );

            group.MapGet("/{id:int}", async (int id, ExpenseTrackerDbContext db) =>
                await db.Categories.FindAsync(id)
                    is Category category ? Results.Ok(category) : Results.NotFound()
            );

            group.MapPost("/", async (CategoryDto dto, ExpenseTrackerDbContext db) =>
            {
                var category = new Category
                {
                    Name = dto.Name,
                    Color = dto.Color
                };
                db.Categories.Add(category);
                await db.SaveChangesAsync();
                return Results.Created($"/api/categories/{category.Id}", category);
            });

            group.MapPut("/{id:int}", async (int id, CategoryDto dto, ExpenseTrackerDbContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                if (category is null) return Results.NotFound();
                category.Name = dto.Name;
                category.Color = dto.Color;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            group.MapDelete("/{id:int}", async (int id, ExpenseTrackerDbContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                if (category is null) return Results.NotFound();
                db.Categories.Remove(category);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}
