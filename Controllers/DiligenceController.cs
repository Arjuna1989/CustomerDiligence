using System;
using System.Web;
using System.Web.Mvc;

namespace CommercePromote.CustomerDiligenceClient.Controllers
{
    public class DiligenceController : BaseController
    {
        // GET: Diligent
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            return View();
        }

        public ActionResult Create(/*int id = 0, int AmlGroupId = 0*/)
        {
            //ViewBag.Id = id == 0 ? 0 : id;
            //ViewBag.AmlGroupId = AmlGroupId == 0 ? 0 : AmlGroupId;
            return View();
        }

        public ActionResult Edit(int id)
        {
            ViewBag.Id = id;
          
            return View();
        }

        public ActionResult Contacts()
        {
            return View();
        }

        public ActionResult Sync()
        {
            return View();
        }

        public ActionResult AmlPricing()
        {
            return View();
        }
        public ActionResult EditAnnex(int id)
        {
            ViewBag.Id = id;
            return View();
        }
        public ActionResult SignAnnex(int id)
        {
            ViewBag.Id = id;
            return View();
        }

        
    }
}