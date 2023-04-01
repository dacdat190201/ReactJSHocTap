using AutoMapper;
using testapi.Entities;
using testapi.Models.UserModels;

namespace testapi.Mappings.UserMapping
{
    public class HoaDonProfile : Profile
    {
        public HoaDonProfile() {
            CreateMap<Hoadon, HoaDonModels>().ReverseMap();
        }
    }
}
