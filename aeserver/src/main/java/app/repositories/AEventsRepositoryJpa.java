package app.repositories;

import app.models.AEvent;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
@Primary
public class AEventsRepositoryJpa implements AEventsRepository {

  @PersistenceContext
  EntityManager em;

  @Override
  public List findByQuery(Object filter) {
    if (filter.getClass() == Boolean.class) {
      System.out.println("Status found");
      return em.createNamedQuery("AEvent_find_by_status").setParameter(1, filter).getResultList();
    } else if (filter.getClass() == Integer.class) {
      return em.createNamedQuery("AEvent_find_by_minRegistrations").setParameter(1, filter).getResultList();
    } else if (filter.getClass() == String.class) {
      return em.createNamedQuery("AEvent_find_by_title").setParameter(1, "%" + filter + "%").getResultList();
    }
    System.out.println("No class found");
    return null;
  }

  @Override
  public List<AEvent> findAll() {
    return em.createNativeQuery("SELECT * from AEVENT", AEvent.class).getResultList();
  }

  @Override
  public AEvent save(AEvent aEvent) {
    em.persist(aEvent);
    return aEvent;
  }

  @Override
  public AEvent findById(long id) {
    return em.find(AEvent.class, id);
  }

  @Override
  public boolean deleteById(long id) {
    try {
      em.remove(findById(id));
      return true;
    } catch (Exception e) {
      System.out.println(e);
      return false;
    }
  }
}
