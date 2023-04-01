using AutoMapper;
using testapi.Entities;
using testapi.Models.TeamModels;

namespace testapi.Mappings.TeamMapping
{
    public class TCauTraLoiProfile : Profile
    {
        public TCauTraLoiProfile()
        {
            CreateMap<Cautraloi, CauTraLoiModel>().ReverseMap();
        }
    }
}
