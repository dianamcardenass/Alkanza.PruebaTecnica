namespace Alkanza.Controllers.Controllers
{
    using BusinessLogic.Logic;
    using BusinessLogic.Model;
    using System;
    using System.Web.Mvc;

    public class HistoricoController : Controller
    {
        private readonly IHistoricoLogic historicoLogic;

        public HistoricoController(IHistoricoLogic historicoLogic)
        {
            this.historicoLogic = historicoLogic;
        }

        public ActionResult Historico()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetHistorico()
        {
            var data = historicoLogic.GetHistorico();
            return this.Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveHistorico(Historico historico)
        {
            historico.FechaGeneracion = DateTime.Now;
            historicoLogic.SaveData(historico);
            return this.Json("OK", JsonRequestBehavior.AllowGet);
        }
    }
}
