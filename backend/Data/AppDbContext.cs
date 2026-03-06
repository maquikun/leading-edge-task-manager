using Microsoft.EntityFrameworkCore;
using LETM.Models;

namespace LETM.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Todo> Todos { get; set; }
    }
}