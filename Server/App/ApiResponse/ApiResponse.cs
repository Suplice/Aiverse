using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.Core.ApiResponse
{
    public class ApiResponse<T>
    {

        public bool success { get; set; }
        public string message { get; set; }
        public T data { get; set; }
        public IDictionary<string , List<string>?>? errors { get; set; }

        public ApiResponse(bool _success, string _message, T _data, IDictionary<string, List<string>?>? _errors = null) { 
            success = _success;
            message = _message;
            data = _data;
            errors = _errors;
        }

    }
}