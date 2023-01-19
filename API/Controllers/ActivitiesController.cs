
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Application;
using Application.Activities.core;

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
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));

           // return Ok(await Mediator.Send(new List.Query()));

        }


        [HttpGet("{id}")]

        public async Task<IActionResult> GetActivity(Guid id)
        {

            var result = await Mediator.Send(new Details.Query { Id = id });
            return HandleResult(result);

        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {


            //_logger.LogError("error n creating activities");

            return  HandleResult(await Mediator
            .Send(new Create.Command { Activity = activity }));

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {


            //_logger.LogError("error n creating activities");


            activity.ID = id;



            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command() { Id = id }));

        }

    }
}