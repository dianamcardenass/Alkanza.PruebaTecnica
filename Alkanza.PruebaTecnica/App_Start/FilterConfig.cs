using System.Web;
using System.Web.Mvc;

namespace Alkanza.PruebaTecnica
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
