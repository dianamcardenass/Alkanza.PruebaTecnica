namespace BusinessLogic.Logic
{
    using BusinessLogic.Model;
    using BusinessLogic.Repositorio;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class CentroMedicoLogic : ICentroMedicoLogic
    {
        private readonly ICentroMedicoRepository centroMedicoRepository;

        public CentroMedicoLogic(ICentroMedicoRepository centroMedicoRepository)
        {
            this.centroMedicoRepository = centroMedicoRepository;
        }

        public IEnumerable<CentroMedicoModel> GetAll()
        {
            try
            {
                IEnumerable<CentroMedico> dataTmp = this.centroMedicoRepository.GetAllData();
                IEnumerable<CentroMedicoModel> data = (from item in dataTmp.ToList()
                                                       select new CentroMedicoModel()
                                                       {
                                                           Direccion = item.Direccion,
                                                           Id = item.Id,
                                                           latitud = item.latitud,
                                                           longitud = item.longitud,
                                                           Nombre = item.Nombre
                                                       }).ToList();
                return data.OrderBy(s => s.Nombre);
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<CentroMedicoModel>();
            }
        }
    }
}
