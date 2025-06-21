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
