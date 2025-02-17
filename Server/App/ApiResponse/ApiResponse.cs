using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.Core.ApiResponse
{   
    /// <summary>
    /// Represents a standardized API response format for returning data, messages, and errors.
    /// </summary>
    /// <typeparam name="T">The type of the data payload included in the response.</typeparam>
    /// <remarks>
    /// The <see cref="ApiResponse{T}"/> class is designed to provide a consistent structure for API responses.
    /// It includes properties for success status, a message, the data payload, and optional error details.
    /// This structure is useful for ensuring uniformity across API endpoints and simplifying client-side handling.
    /// </remarks>
    public class ApiResponse<T>
    {

        /// <summary>
        /// Gets or sets a value indicating whether the API request was successful.
        /// </summary>
        /// <remarks>
        /// This property is <c>true</c> if the request was successful; otherwise, <c>false</c>.
        /// </remarks>
        public bool success { get; set; }

        /// <summary>
        /// Gets or sets a message describing the result of the API request.
        /// </summary>
        /// <remarks>
        /// This property typically contains a human-readable message, such as "Operation successful" or "Invalid input."
        /// </remarks>
        public string message { get; set; }

        /// <summary>
        /// Gets or sets the data payload included in the API response.
        /// </summary>
        /// <remarks>
        /// This property contains the primary data returned by the API, such as an object or a list of objects.
        /// </remarks>
        public T data { get; set; }

        /// <summary>
        /// Gets or sets a dictionary of errors, if any, that occurred during the API request.
        /// </summary>
        /// <remarks>
        /// This property is used to provide detailed error information, such as validation errors.
        /// The dictionary keys represent the field or category of the error, and the values are lists of error messages.
        /// </remarks>
        public IDictionary<string , List<string>?>? errors { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="ApiResponse{T}"/> class.
        /// </summary>
        /// <param name="_success">Indicates whether the API request was successful.</param>
        /// <param name="_message">A message describing the result of the API request.</param>
        /// <param name="_data">The data payload included in the API response.</param>
        /// <param name="_errors">A dictionary of errors, if any, that occurred during the API request.</param>
        public ApiResponse(bool _success, string _message, T _data, IDictionary<string, List<string>?>? _errors = null) { 
            success = _success;
            message = _message;
            data = _data;
            errors = _errors;
        }

    }
}