using Datingapp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Datingapp.API.Data
{
    public class DataContext  : DbContext   
    {
        public DataContext(DbContextOptions<DataContext> DbContextOptions) : base(DbContextOptions)
        {
            
        }
        public DbSet<Value> Values { get; set; }
        
        public DbSet<User> Users { get; set; }  
    }
}