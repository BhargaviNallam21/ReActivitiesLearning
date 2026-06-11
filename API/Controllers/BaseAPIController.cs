using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseAPIController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator =>
        _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new Exception("Mediator not found");

        // public ActionResult HandleResult<T>(Result<T> result)
        // {
        //     if (result == null) return NotFound();
        //     if (result.IsSuccess && result.Value != null) return Ok(result.Value);
        //     if (result.IsSuccess && result.Value == null) return NotFound();
        //     //return BadRequest(result.Error);
        //     return BadRequest(new AppException(
        //      result.Code,
        //      result.Error!,
        //      null
        //     ));
        // }
        public ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();

            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);

            if (!result.IsSuccess && result.Code == 404)
                return NotFound(new AppException(
                    result.Code,
                    result.Error!,
                    null
                ));

            return BadRequest(new AppException(
                result.Code,
                result.Error!,
                null
            ));
        }
    }
}
