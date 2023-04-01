using AutoMapper;
using testapi.Entities;
using testapi.Models.DonHangModels;
using testapi.Models.GioHangModels;

namespace testapi.Mappings.GioHangMapping
{
    public class MapGioHang : Profile
    {
        public MapGioHang() {
            CreateMap<Giohang, GioHangModel>().ReverseMap();
        }
    }
}
