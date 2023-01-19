using Application.Activities.core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        
        public class Command   : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

         public class CommandValidator : AbstractValidator<Command>
       // public class CommandValidator : AbstractValidator<Activity>
        {
            public CommandValidator()
            {
                //RuleFor( x => x.Title).NotEmpty();
                RuleFor( x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public IMapper Mapper { get; }

            public Handler(DataContext context, IMapper mapper )
            {
            _context = context;
            _mapper = mapper;
                
            }

            public  async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.ID);

                if(activity == null) return null;

                 if(activity  != null)
                 {
                   // activity.Title = request.Activity.Title ?? activity.Title;
                    // _context.Activities.Update(activity);
                   _mapper.Map(request.Activity, activity);

                   await _context.SaveChangesAsync();

                 }

                   var result = await _context.SaveChangesAsync() > 0;

                   if( !result)
                   {
                    Result<Unit>.Failure("Failed to Update the activity");
                   }


                    return   Result<Unit>.Success(Unit.Value);
            }
        }
    }
        
    
}