namespace BusinessLogic.Model
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class CentroMedicoModel
    {
        public Guid Id { get; set; }
        public string latitud { get; set; }
        public string longitud { get; set; }
        public string Direccion { get; set; }
        public string Nombre { get; set; }
    }
}
