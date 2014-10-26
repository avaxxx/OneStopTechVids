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

    
    public class RegistrationController : ApiController
    {

        [HttpPost]
        public IHttpActionResult Register([FromBody] RegistrationData data)
        {
            if (data != null && data.ConfirmPassword == data.Password)
            {
                if (TechVideosData.Users.Any(o => o.UserName == data.UserName))
                {
                    return Ok(false);
                }

                int id = TechVideosData.Users.Select(o => o.Id).Max();

                TechVideosData.Users.Add(new User()
                {
                    UserName = data.UserName,
                    Password = data.Password,
                    Id = id + 1
                });

                return Ok(true);

            }

            return Ok(false);
        }
        

    }
}
