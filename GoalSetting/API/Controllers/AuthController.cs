using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
         private readonly DetailContext _context;
          private readonly IConfiguration _config;
        public AuthController(DetailContext context,IConfiguration config)
        {
            _context = context;
            _config = config;
        }
           [HttpPost("login")]
        public async Task<IActionResult> Login(Login login)
        {
           var user = await Login(login.EmployeeName,login.Password);

            if (user == null)
                return Unauthorized();
            

             
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.EmployeeId.ToString()),
                new Claim(ClaimTypes.Name, user.EmployeeName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

           

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }


        
        public async Task<Employee> Login(string username, string password)
        {
            var user = await _context.Employees.FirstOrDefaultAsync(x => x.EmployeeName ==username);

            if (user == null)
                return null;

            var pass = await _context.Employees.FirstOrDefaultAsync(x => x.Password == password);
            if (pass == null)
                return null;
            
            return user;
        }
    }
}
