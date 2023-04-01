
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testapi.Models.AccountViewModels;

namespace testapi.Services
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}