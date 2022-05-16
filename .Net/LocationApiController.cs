using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Locations;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/locations")]
    [ApiController]
    public class LocationApiController : BaseApiController
    {
        private ILocationService _service = null;
        public LocationApiController(ILocationService service
            , ILogger<LocationApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(LocationAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int id = _service.Add(model);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Location>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Location location = _service.Get(id);
                if (location == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<Location> { Item = location };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(LocationUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {

                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);

            }
            return StatusCode(iCode, response);
        }
    }
}
