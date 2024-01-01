using System.Web.Mvc;

namespace CommercePromote.CustomerDiligenceClient.Controllers
{
    public class SignatureController : BaseController
    {
      public ActionResult Index(int id)
        {
            ViewBag.Id = id;
            return View();
        }
    }
}