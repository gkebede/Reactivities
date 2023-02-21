using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence;
public class DataContext : IdentityDbContext<AppUser>

{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Activity> Activities {get;set;}

    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder.Entity<AppUser>( a => {
            a.GetType();

        }));
    }

}
