using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers( opt => 
{ 
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
     opt.Filters.Add( new AuthorizeFilter( policy));
});

   // public static class ApplicationServiceExtensions
builder.Services.AddApplicationservices(builder.Configuration);
   // public static class IdentityServiceExtensions
builder.Services.AddIdentityServices(builder.Configuration);




var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

//app.UseHttpsRedirection();
 app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

//*** added codes to migrate and seed data to the necessary tables
using var scope = app.Services.CreateScope();

var servises = scope.ServiceProvider;

try
{
    var context = servises.GetRequiredService<DataContext>();
    var userManager = servises.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    
    var logger = servises.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurd during migration!");
}

app.Run();
