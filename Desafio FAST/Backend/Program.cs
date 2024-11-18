using Microsoft.EntityFrameworkCore;
using ProjectName.Data;

var builder = WebApplication.CreateBuilder(args);

// Configura o banco de dados na memória
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("TestDatabase"));

// Adiciona os controladores
builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
