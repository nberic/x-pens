using XPens.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Register only the needed CRUD endpoints
ExpensesEndpoints.MapExpensesEndpoints(app);
CategoriesEndpoints.MapCategoriesEndpoints(app);

app.Run();
