namespace Alkanza.PruebaTecnica.Controllers
{
    using BusinessLogic.Logic;
    using System.Web.Mvc;

    public class PortafolioController : Controller
    {
        private readonly ICentroMedicoLogic centroMedicoLogic;

        public PortafolioController(ICentroMedicoLogic centroMedicoLogic)
        {
            this.centroMedicoLogic = centroMedicoLogic;
        }

        public ActionResult Portafolio()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetCentrosMedicos()
        {
            var data = centroMedicoLogic.GetAll();
            return this.Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}