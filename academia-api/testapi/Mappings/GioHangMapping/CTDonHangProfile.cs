using AutoMapper;
using testapi.Entities;
using testapi.Models.DonHangModels;

namespace testapi.Mappings.GioHangMapping
{
    public class CTDonHangProfile : Profile
    {
        public CTDonHangProfile()
        {
            CreateMap<Cthoadon, CTHoaDonModel>().ReverseMap();
        }
    }
}
