using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using OneStopTechVids.Model;

namespace OneStopTechVids.WebAPI
{

    
    public class AuthorizationController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Login([FromBody]User user)
        {
            if (string.IsNullOrWhiteSpace(user.UserName) || string.IsNullOrWhiteSpace(user.Password))
                return Ok(string.Empty);

            if (TechVideosData.Users.Any(u => u.UserName == user.UserName && u.Password == user.Password))
                return Ok(user.UserName+user.Password);
            else
                return Ok(string.Empty);
        }
    }
}
