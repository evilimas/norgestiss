using Microsoft.EntityFrameworkCore;
using NorgesTiss.Model;

namespace NorgesTiss;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<PublicToilet> PublicToilets { get; set; }
    
}