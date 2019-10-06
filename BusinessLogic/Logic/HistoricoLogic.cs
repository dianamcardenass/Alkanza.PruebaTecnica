namespace BusinessLogic.Logic
{
    using BusinessLogic.Model;
    using BusinessLogic.Repositorio;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class HistoricoLogic : IHistoricoLogic
    {
        private readonly IHitoricoCalculoDesbalance hitoricoCalculoDesbalance;

        public HistoricoLogic(IHitoricoCalculoDesbalance hitoricoCalculoDesbalance)
        {
            this.hitoricoCalculoDesbalance = hitoricoCalculoDesbalance;
        }

        public void SaveData(Historico historico)
        {
            try
            {
                HistoricoCalculoDesbalance historicoDesbalance = new HistoricoCalculoDesbalance() {
                    Id = Guid.NewGuid(),
                    FechaGeneracion = historico.FechaGeneracion,
                    LatitudPuntoInicial = historico.LatitudPuntoInicial,
                    LongirudPuntoInicial = historico.LongirudPuntoInicial,
                    calculoDesbalance = historico.calculoDesbalance
                };

                this.hitoricoCalculoDesbalance.SaveData(historicoDesbalance);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public IEnumerable<Historico> GetHistorico()
        {
            try
            {
                IEnumerable<HistoricoCalculoDesbalance> data = this.hitoricoCalculoDesbalance.GetAll();
                IEnumerable<Historico> historico = (from item in data.ToList()
                                                    select new Historico()
                                                    {
                                                        Id = item.Id,
                                                        FechaGeneracion = item.FechaGeneracion.GetValueOrDefault(),
                                                        LatitudPuntoInicial = item.LatitudPuntoInicial,
                                                        LongirudPuntoInicial = item.LongirudPuntoInicial,
                                                        calculoDesbalance = item.calculoDesbalance.GetValueOrDefault(),
                                                    }).ToList();

                return historico;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<Historico>();
            }
        }
    }
}
