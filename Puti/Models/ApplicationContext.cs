using Microsoft.EntityFrameworkCore;

namespace Puti.Models
{
    public class ApplicationContext : DbContext

    {
        public DbSet<User> Users { get; set; }
        public DbSet<WasteСollectionPoint> WasteСollectionPoints { get; set; }
        public DbSet<StockPoint> StockPoints { get; set; }
        public DbSet<ParkingPoint> ParkingPoints { get; set; }
        public DbSet<Route> Routes { get; set; }
        public ApplicationContext()
    {
       Database.EnsureCreated();
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       optionsBuilder.UseSqlServer("Server=DELL-INSPIRON-1\\SQLEXPRESS;Database=Waste_v2;Trusted_Connection=True;");
    }

    }

}
