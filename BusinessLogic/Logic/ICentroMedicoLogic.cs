namespace BusinessLogic.Logic
{
    using BusinessLogic.Model;
    using System.Collections.Generic;
    
    public interface ICentroMedicoLogic
    {
        IEnumerable<CentroMedicoModel> GetAll();
    }
}
