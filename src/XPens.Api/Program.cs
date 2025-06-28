using Microsoft.EntityFrameworkCore;
using XPens.Api.Endpoints;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// Register DbContext with SQLite
builder.Services.AddDbContext<XPens.Api.Data.ExpenseTrackerDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=expenses.db"));

builder.Services.AddOpenApi();
builder.Services.AddScoped<XPens.Api.Services.IExpenseService, XPens.Api.Services.ExpenseService>();
builder.Services.AddCors(); // Register CORS services

var app = builder.Build();

// Seed default categories if none exist
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<XPens.Api.Data.ExpenseTrackerDbContext>();
    db.Database.EnsureCreated();
    if (!db.Categories.Any())
    {
        db.Categories.AddRange(new[]
        {
            new XPens.Api.Models.Category { Name = "Food", Color = "#F87171" },
            new XPens.Api.Models.Category { Name = "Transport", Color = "#60A5FA" },
            new XPens.Api.Models.Category { Name = "Utilities", Color = "#FBBF24" },
            new XPens.Api.Models.Category { Name = "Entertainment", Color = "#34D399" }
        });
        db.SaveChanges();
    }
}

// Enable CORS for development
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod()
);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Register only the needed CRUD endpoints
ExpensesEndpoints.MapExpensesEndpoints(app);
CategoriesEndpoints.MapCategoriesEndpoints(app);

app.Run();
