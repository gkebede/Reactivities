
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        
        public ActivitiesController(DataContext context )
        {
            _context = context;
        }

// http://localhost:5000/activities
         [HttpGet]
         public async Task<ActionResult<List<Activity>>> GetActivities() 
         {
            return await _context.Activities.ToListAsync();
         }

//http://localhost:5000/activities/58e98af9-0159-4851-c4d5-08dadc8169d0

         [HttpGet("{id}")]
         public async Task<ActionResult<Activity>> GetActivity(Guid id) 
         {
            return await _context.Activities.FindAsync(id);
         }
    }
}