package app.repositories;

import app.models.AEvent;

import javax.persistence.EntityManager;
import java.util.List;

public interface AEventsRepository {

  List findByQuery(Object filter);

  List<AEvent> findAll();

  public AEvent save(AEvent aEvent);

  public AEvent findById(long id);

  public boolean deleteById(long id);
}
