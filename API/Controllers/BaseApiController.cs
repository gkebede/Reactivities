using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    
[ApiController]
[Route("api/[controller]")]
    public class BaseApiController   : ControllerBase
    {
        private IMediator _mediator;
        
   
   //     protected IMediator[] Mediator => _mediator??= (IMediator[])(HttpContext.RequestServices.GetServices<IMediator>());

       

        protected IMediator Mediator => _mediator??= HttpContext.RequestServices.GetService<IMediator>();

     
    }
}