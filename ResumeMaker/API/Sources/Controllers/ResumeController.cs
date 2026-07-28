//using API.Sources.Cores;
//using API.Sources.Requests;
//using API.Sources.Services.Resumes;
//using Microsoft.AspNetCore.Mvc;

//namespace API.Sources.Controllers;

//[ApiController]
//[Route("api/[controller]")]
//public class ResumeController(IResumeService service) : ControllerBase
//{
//    [HttpPost]
//    public ActionResult<ResponseCore<ResumeResponse>> CreateResume([FromBody] ResumeRequest request)
//    {
//        var response = service.CreateResume(request);
//        return Ok(response);
//    }

//    [HttpGet("{userId}")]
//    public ActionResult<ResponseCore<ResumeResponse>> ReadResume(int userId)
//    {
//        var response = service.ReadResume(userId);
//        return Ok(response);
//    }

//    [HttpGet("user/{userId}")]
//    public ActionResult<ResponseCore<List<ResumeResponse>>> ReadResumes(int userId)
//    {
//        var response = service.ReadResumesByUserId(userId);
//        return Ok(response);
//    }

//    [HttpPatch("{userId}")]
//    public ActionResult<ResponseCore<ResumeResponse>> UpdateResumes(int userId, [FromBody] ResumeRequest request)
//    {
//        var response = service.UpdateResume(userId, request);
//        return Ok(response);
//    }

//    [HttpDelete("{resumeId}")]
//    public ActionResult<ResponseCore<ResumeResponse>> DeleteResume(int resumeId)
//    {
//        var response = service.DeleteResume(resumeId);
//        return Ok(response);
//    }
//}
