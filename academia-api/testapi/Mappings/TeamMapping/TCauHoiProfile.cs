using AutoMapper;
using testapi.Entities;
using testapi.Models.TeamModels;

namespace testapi.Mappings.TeamMapping
{
    public class TCauHoiProfile : Profile
    {
        public TCauHoiProfile()
        {
            CreateMap<Cauhoi, CauHoiModel>().ReverseMap();
        }
    }
}
