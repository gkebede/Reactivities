using AutoMapper;
using Domain;

namespace Application.Activities.core
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
        
    }
}