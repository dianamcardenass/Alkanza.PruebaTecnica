using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogic.Repositorio
{
    public class CentroMedicoRepository : GenericRepository<CentrosMedicosEntities, CentroMedico>, ICentroMedicoRepository
    {

        public CentroMedicoRepository()
        {
        }

        public IEnumerable<CentroMedico> GetAllData()
        {
            IEnumerable<CentroMedico> centrosMedicos = this.GetAll();
            return centrosMedicos;
        }

        public CentroMedico GetSingle(Guid id)
        {
            IEnumerable<CentroMedico> centrosMedicos = this.FindBy(x => x.Id == id);
            return centrosMedicos.FirstOrDefault();
        }
    }
}
