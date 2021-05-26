package app.repositories;

import app.models.Registration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
@Primary
public class RegistrationRepositoryJpa {

  @PersistenceContext
  EntityManager em;

  public List<Registration> findAll() {
    return em.createNativeQuery("SELECT * from REGISTRATION").getResultList();
  }

  public Registration save(Registration registration) {
      em.merge(registration);
      return registration;
  }

  public Registration findById(long id) {
    return em.find(Registration.class,id);
  }

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
