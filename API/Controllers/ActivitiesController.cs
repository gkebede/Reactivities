
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Application;
using Microsoft.AspNetCore.Authorization;
using Persistence;



namespace API.Controllers
{

    public class ActivitiesController : BaseApiController
    {

        private readonly ILogger<ActivitiesController> _logger;
        private readonly DataContext _context;

        public ActivitiesController(ILogger<ActivitiesController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }




        // http://localhost:5000/activities
       // [Authorize]
         [AllowAnonymous]
        [HttpGet]
       // public IActionResult GetActivities()
        public async Task<IActionResult> GetActivities()
        {
        //   _logger.LogError("Ii is reading herer");

            
            return HandleResult(await Mediator.Send(new List.Query()));
            
          // return Ok(_context.Activities.ToList());
        }


       // [Authorize]
         [AllowAnonymous]
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

        [Authorize("IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {


            //_logger.LogError("error n creating activities");


            activity.Id = id;



            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));

        }

        [Authorize("IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command() { Id = id }));

        }

            [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }

    }
}