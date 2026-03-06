using Microsoft.EntityFrameworkCore;
using LETM.Data;
using LETM.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite("Data Source=letm.db");
});

builder.Services.AddOpenApi();
builder.Services.AddHealthChecks();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Create db if it doesn't exist
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();
app.UseHttpsRedirection();
app.MapHealthChecks("/health");

app.MapGet("/v1/todos", async (AppDbContext db) =>
{
    var todos = await db.Todos.ToListAsync();
    return Results.Ok(todos);
})
.WithName("GetTodos");

app.MapGet("/v1/todos/{id}", async (int id, AppDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo == null) return Results.NotFound();
    return Results.Ok(todo);
})
.WithName("GetTodo");

app.MapPost ("/v1/todos", async (Todo todo, AppDbContext db) =>
{
    todo.CreatedAt = DateTimeOffset.UtcNow;
    todo.UpdatedAt = DateTimeOffset.UtcNow;

    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/v1/todos/{todo.Id}", todo);
})
.WithName("CreateTodo");

app.MapMethods("/v1/todos/{id}", new[] { "PATCH" }, async (int id, UpdateTodo updatedTodo, AppDbContext db) =>
{
    var existingTodo = await db.Todos.FindAsync(id);
    if (existingTodo == null) return Results.NotFound();

    if (!string.IsNullOrWhiteSpace(updatedTodo.Title)) existingTodo.Title = updatedTodo.Title;
    if (!string.IsNullOrWhiteSpace(updatedTodo.Description)) existingTodo.Description = updatedTodo.Description;
    if (updatedTodo.IsCompleted.HasValue) existingTodo.IsCompleted = updatedTodo.IsCompleted.Value;
    existingTodo.UpdatedAt = DateTimeOffset.UtcNow;

    await db.SaveChangesAsync();
    return Results.Ok(existingTodo);
})
.WithName("UpdateTodo");

app.MapDelete("/v1/todos/{id}", async (int id, AppDbContext db) =>
{
    var existingTodo = await db.Todos.FindAsync(id);
    if (existingTodo == null) return Results.NotFound();

    db.Todos.Remove(existingTodo);
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("DeleteTodo");

app.Run();