using System.Security.Claims;
using Application.Activities;
using Application.Activities.core;
using MediatR;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        //     protected IMediator[] Mediator => _mediator??= (IMediator[])(HttpContext.RequestServices.GetServices<IMediator>());
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected IActionResult HandleResult<T>(Result<T> result)
        {
            if(result == null) 
            {
                return NotFound();
            }

            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result);
            }

            if (result.IsSuccess && result.Value == null)
            {
                return NotFound(StatusCodes.Status404NotFound);
            }

            return BadRequest(result.Error);
        }

    }
}