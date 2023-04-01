using AutoMapper;
using testapi.Entities;
using testapi.Models.KiemTraModels;

namespace testapi.Mappings
{
    public class KiemTraProfile : Profile
    {
        public KiemTraProfile()
        {
            CreateMap<Kiemtra, KiemTraModel>().ReverseMap();
        }
    }
}
