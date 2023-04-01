using AutoMapper;
using testapi.Entities;
using testapi.Models.UserModels;

namespace testapi.Mappings.UserMapping
{
    public class CtHoaDonProfile : Profile
    {
        public CtHoaDonProfile()
        {
            CreateMap<Cthoadon, CtHoaDonModel>().ReverseMap();
        }
    }
}
