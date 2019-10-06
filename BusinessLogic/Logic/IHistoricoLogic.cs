namespace BusinessLogic.Logic
{
    using BusinessLogic.Model;
    using System.Collections.Generic;
    
    public interface IHistoricoLogic
    {
        void SaveData(Historico historico);
        IEnumerable<Historico> GetHistorico();
    }
}
