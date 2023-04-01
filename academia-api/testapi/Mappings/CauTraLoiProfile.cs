using AutoMapper;
using testapi.Entities;
using testapi.Models.CauTraLoiModels;

namespace testapi.Mappings
{
    public class CauTraLoiProfile : Profile
    {
        public CauTraLoiProfile()
        {
            CreateMap<Cautraloi, CauTraLoiModel>().ReverseMap();
        }
    }
}
