using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class UserRefreshTokens
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string RefreshToken { get; set; }
    }
}
