using AutoMapper;
using testapi.Entities;
using testapi.Models.DonHangModels;

namespace testapi.Mappings.GioHangMapping
{
    public class GioHangProfile : Profile
    {
        public GioHangProfile()
        {
            CreateMap<Hoadon, HoaDonModel>().ReverseMap();
        }
    }
}
