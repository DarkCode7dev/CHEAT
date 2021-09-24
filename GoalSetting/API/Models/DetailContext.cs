using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models {
    public class DetailContext : DbContext
    {
        public DetailContext(DbContextOptions<DetailContext> options) : base(options)
        { }
            public DbSet<Employee> Employees { get; set;}
        
    }
}
