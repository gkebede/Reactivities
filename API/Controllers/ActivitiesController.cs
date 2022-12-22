
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using MediatR;
using Microsoft.Extensions.Logging;
using Application;

namespace API.Controllers
{

    public class ActivitiesController : BaseApiController
    {

        private readonly ILogger<ActivitiesController> _logger;

        public ActivitiesController(ILogger<ActivitiesController> logger)
        {
            _logger = logger;
        }




        // http://localhost:5000/activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());

        }


        [HttpGet("{id}")]

        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {

            return await Mediator.Send(new Details.Query { Id = id });

        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {


            //_logger.LogError("error n creating activities");



            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {


            //_logger.LogError("error n creating activities");
             

            activity.ID = id;

          

            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete (Guid id) 
        {

          return Ok(await Mediator.Send(new Delete.Command() {Id = id}));

        }

    }
}