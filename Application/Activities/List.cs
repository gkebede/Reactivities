using Domain;
using Application.Activities.core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
// Application\Activities\ActivityDto.cs
namespace Application.Activities
{
    public class List
    {

        public class Query : IRequest<Result<List<ActivityDto>>> { }
        // public record Query() : IRequest<Result<List<Activity>>> {}

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {


            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;

            }



            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                // THIS EAGER LOADING ---

                // var activities = await _context.Activities
                //  .Include(aa => aa.Attendees)
                //  .ThenInclude( u => u.AppUser)
                // .ToListAsync(cancellationToken);
                // var activitiesReturn = _mapper.Map<List<ActivityDto>>(activities);

                // return Result<List<ActivityDto>>.Success(activitiesReturn);

              // THIS PROJECTION (I.E. INHERETED FROM mapping) LOADING ---
                var activities = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                return Result<List<ActivityDto>>.Success(activities);

            }
        }
    }
}