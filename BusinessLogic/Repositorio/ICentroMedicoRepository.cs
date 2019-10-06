using System.Collections.Generic;

namespace BusinessLogic.Repositorio
{
    public interface ICentroMedicoRepository : IGenericRepository<CentroMedico>
    {
        IEnumerable<CentroMedico> GetAllData();
    }
}
