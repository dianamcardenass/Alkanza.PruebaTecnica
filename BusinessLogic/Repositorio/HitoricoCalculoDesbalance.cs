namespace BusinessLogic.Repositorio
{
    using System.Collections.Generic;

    public class HitoricoCalculoDesbalance : GenericRepository<CentrosMedicosEntities, HistoricoCalculoDesbalance>, IHitoricoCalculoDesbalance
    {
        public IEnumerable<HistoricoCalculoDesbalance> GetAllData()
        {
            IEnumerable<HistoricoCalculoDesbalance> historico = this.GetAll();
            return historico;
        }

        public void SaveData(HistoricoCalculoDesbalance historico)
        {
            this.Add(historico);
            //this.Save();
        }
    }
}
