using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Filters {
    public class SimpleActionFilter : IActionFilter {
        public void OnActionExecuted(ActionExecutedContext context) {
              if (!context.ModelState.IsValid) {
                context.Result = new BadRequestObjectResult(context.ModelState);
                return;
            }
        }

        public void OnActionExecuting(ActionExecutingContext context) {
           
        }
    }
}
