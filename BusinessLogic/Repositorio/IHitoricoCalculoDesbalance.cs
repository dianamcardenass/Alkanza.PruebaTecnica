namespace BusinessLogic.Repositorio
{
    using System.Collections.Generic;

    public interface IHitoricoCalculoDesbalance : IGenericRepository<HistoricoCalculoDesbalance>
    {
        IEnumerable<HistoricoCalculoDesbalance> GetAllData();
        void SaveData(HistoricoCalculoDesbalance historico);
    }
}
