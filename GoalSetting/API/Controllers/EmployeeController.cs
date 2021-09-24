using Backend.Filters;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers {
   
     //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase {

        private readonly DetailContext _context;

        public EmployeeController(DetailContext context) {
            _context = context;
        }

           [HttpGet]
        public IActionResult GetEmployeeDetails()
        {
            return  Ok(_context.Employees);
        }

          [AllowAnonymous]
           [HttpGet("HelpEmployeeDetails")]
        public IActionResult HelpEmployeeDetails()
        {
            return  Ok(_context.Employees);
        }


        [RequireHttps]
        [ServiceFilter(typeof(SimpleActionFilter))]
        public IActionResult Post([FromBody] Employee employee) {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created);
        }



          [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Employee employee)
        {
           var entity= _context.Employees.Find(id);
            if (entity==null)
            {
                return NotFound("No record found against this id...");
            }
            else
            {
                entity.EmployeeName= employee.EmployeeName;
                entity.Technology = employee.Technology;
                entity.Password = employee.Password;
                _context.SaveChanges();
                return Ok("Records updated successfully");
            }
           
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var quote = _context.Employees.Find(id);
             if (quote == null)
            {
                return NotFound("No record found against this id...");

            }
            else
            {
               
                _context.Remove(quote);
                _context.SaveChanges();
                return Ok("Quote deleted...");
            }
        }

           [HttpGet("[action]")]
        public IActionResult PagingQuote(int? pageNumber , int? pageSize)
        {
                var quotes = _context.Employees;
                var currentPageNumber = pageNumber ?? 1;
                var currentPageSize = pageSize ?? 5;


                return Ok(quotes.Skip((currentPageNumber-1)*currentPageSize).Take(currentPageSize));
        }
    }
}
