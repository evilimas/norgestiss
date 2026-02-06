using Microsoft.EntityFrameworkCore;

namespace NorgesTiss;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Таблицы проекта
    public DbSet<PublicToilet> PublicToilets { get; set; }
    
}