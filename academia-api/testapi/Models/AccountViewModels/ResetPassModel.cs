namespace testapi.Models.AccountViewModels
{
    public class ResetPassModel
    {
        public string Email { get; set; }
        public string passOld { get; set; }
        public string passNew { get; set; }
        public string conformPass { get; set;}
        public string code { get; set;}
    }
}
