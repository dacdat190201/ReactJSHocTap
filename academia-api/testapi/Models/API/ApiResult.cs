namespace testapi.Models.API
{
    public class ApiResult<T>
    {
        //public bool? Success { get; set; }
        public string message { get; set; }
        public T data { get; set; }

        public ApiResult ()
        {  }

        public ApiResult (/*bool? success,*/ string message, T data)
        {
            //Success = success;
            this.message = message;
            this.data = data;
        }
    }
}
