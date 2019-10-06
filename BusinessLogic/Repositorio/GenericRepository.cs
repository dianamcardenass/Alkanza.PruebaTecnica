using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace BusinessLogic.Repositorio
{
    public abstract class GenericRepository<C, T> : IGenericRepository<T> where T : class where C : DbContext, new()
    {

        private C _entities = new C();
        public C Context
        {

            get { return _entities; }
            set { _entities = value; }
        }

        public IEnumerable<T> GetAll()
        {

            IEnumerable<T> query = _entities.Set<T>();
            return query;
        }

        public IEnumerable<T> FindBy(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> query = _entities.Set<T>().Where(predicate);
            return query;
        }

        public void Add(T entity)
        {
            _entities.Set<T>().Add(entity);
            this.Context.SaveChanges();
        }

        public void Delete(T entity)
        {
            _entities.Set<T>().Remove(entity);
        }

        public void Edit(T entity)
        {
           _entities.Entry(entity).State = EntityState.Modified;
        }

        public void Save()
        {
            _entities.SaveChanges();
        }
    }
}
