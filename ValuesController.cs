using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi31.Controllers
{
    public class ValuesController : ApiController
    {
        //Create instance of Linq-To-Sql class as db
        DataClasses1DataContext db = new DataClasses1DataContext();


        //This action method return all members records.
        // GET api/values
        public IEnumerable<web> Get()
        {
            return db.webs.ToList().AsEnumerable();
        }

        // GET api/values/5
        public HttpResponseMessage Get(int id)
        {
            //fetching and filter specific member id record
            var memberdetail = (from a in db.webs where a.id == id select a).FirstOrDefault();

            //checking fetched or not with the help of NULL or NOT.
            if (memberdetail != null)
            {
                //sending response as status code OK with memberdetail entity.
                return Request.CreateResponse(HttpStatusCode.OK, memberdetail);


            }
            else
            {
                //sending response as error status code NOT FOUND with meaningful message.
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Code or Member");
            }
        }

       
    }
}
