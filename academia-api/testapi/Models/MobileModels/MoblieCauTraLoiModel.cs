namespace testapi.Models.MobileModels
{
    public class MoblieCauTraLoiModel
    {
        public int id { get; set; }
        public int? MaCh { get; set; }
        public string DapAn { get; set; }

        public MoblieCauTraLoiModel (int id,int? maCh, string dapAn)
        {
            this.id = id;
            this.MaCh = maCh;
            this.DapAn = dapAn;
        }
    }
}
