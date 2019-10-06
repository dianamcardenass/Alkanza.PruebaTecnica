namespace BusinessLogic.Model
{
    using System;

    public class Historico
    {
        public Guid Id { get; set; }
        public DateTime FechaGeneracion { get; set; }
        public string Fecha => FechaGeneracion.ToShortDateString() + " " + FechaGeneracion.ToShortTimeString();

        public string LatitudPuntoInicial { get; set; }
        public string LongirudPuntoInicial { get; set; }
        public decimal calculoDesbalance { get; set; }
    }
}
