package app.repositories;

import app.models.AEvent;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class AEventsRepositoryMock implements AEventsRepository {

  private AEvent[] events = new AEvent[6];


  public AEventsRepositoryMock() {
    this.events[0] = new AEvent("ADE", Date.valueOf(LocalDate.of(((int) (Math.random() * ((2018 - 2010) + 2010)) + 1), ((int) (Math.random() * ((12 - 1) + 1)) + 1), ((int) (Math.random() * ((25 - 1) + 1)) + 1))), Date.valueOf(LocalDate.now()), "Event", ((int) (Math.random() * ((3 - 1) + 1)) + 1) + "", Math.random() < 0.5, ((int) (Math.random() * ((90 - 1) + 1)) + 1), ((int) (Math.random() * ((12000 - 1) + 1)) + 1));
    this.events[1] = new AEvent("ADE", Date.valueOf(LocalDate.of(((int) (Math.random() * ((2018 - 2010) + 2010)) + 1), ((int) (Math.random() * ((12 - 1) + 1)) + 1), ((int) (Math.random() * ((25 - 1) + 1)) + 1))), Date.valueOf(LocalDate.now()), "Event", ((int) (Math.random() * ((3 - 1) + 1)) + 1) + "", Math.random() < 0.5, ((int) (Math.random() * ((90 - 1) + 1)) + 1), ((int) (Math.random() * ((12000 - 1) + 1)) + 1));
    this.events[2] = new AEvent("ADE", Date.valueOf(LocalDate.of(((int) (Math.random() * ((2018 - 2010) + 2010)) + 1), ((int) (Math.random() * ((12 - 1) + 1)) + 1), ((int) (Math.random() * ((25 - 1) + 1)) + 1))), Date.valueOf(LocalDate.now()), "Event", ((int) (Math.random() * ((3 - 1) + 1)) + 1) + "", Math.random() < 0.5, ((int) (Math.random() * ((90 - 1) + 1)) + 1), ((int) (Math.random() * ((12000 - 1) + 1)) + 1));
    this.events[3] = new AEvent("ADE", Date.valueOf(LocalDate.of(((int) (Math.random() * ((2018 - 2010) + 2010)) + 1), ((int) (Math.random() * ((12 - 1) + 1)) + 1), ((int) (Math.random() * ((25 - 1) + 1)) + 1))), Date.valueOf(LocalDate.now()), "Event", ((int) (Math.random() * ((3 - 1) + 1)) + 1) + "", Math.random() < 0.5, ((int) (Math.random() * ((90 - 1) + 1)) + 1), ((int) (Math.random() * ((12000 - 1) + 1)) + 1));
    this.events[4] = new AEvent("ADE", Date.valueOf(LocalDate.of(((int) (Math.random() * ((2018 - 2010) + 2010)) + 1), ((int) (Math.random() * ((12 - 1) + 1)) + 1), ((int) (Math.random() * ((25 - 1) + 1)) + 1))), Date.valueOf(LocalDate.now()), "Event", ((int) (Math.random() * ((3 - 1) + 1)) + 1) + "", Math.random() < 0.5, ((int) (Math.random() * ((90 - 1) + 1)) + 1), ((int) (Math.random() * ((12000 - 1) + 1)) + 1));
    this.events[5] = new AEvent("ADE", Date.valueOf(LocalDate.of(((int) (Math.random() * ((2018 - 2010) + 2010)) + 1), ((int) (Math.random() * ((12 - 1) + 1)) + 1), ((int) (Math.random() * ((25 - 1) + 1)) + 1))), Date.valueOf(LocalDate.now()), "Event", ((int) (Math.random() * ((3 - 1) + 1)) + 1) + "", Math.random() < 0.5, ((int) (Math.random() * ((90 - 1) + 1)) + 1), ((int) (Math.random() * ((12000 - 1) + 1)) + 1));
//    uniqueID();
  }

  public AEvent[] getEvents() {
    return events;
  }

  public void setEvents(AEvent[] events) {
    this.events = events;
  }

//  private void uniqueID() {
//    for (int i = 0; i < events.length ; i++) {
//      events[i].setId(i++);
//    }
//  }


  @Override
  public List findByQuery(Object filter) {
    return null;
  }

  @Override
  public List<AEvent> findAll() {
    return Arrays.asList(events);
  }

  @Override
  public AEvent save(AEvent aEvent) {
    if (aEvent.getId() == 0) {
      AEvent[] temp = new AEvent[events.length + 1];

      for (int i = 0; i < temp.length; i++) {
        if (i != temp.length - 1) {
          temp[i] = events[i];
        } else {
          temp[i] = aEvent;
        }
      }
      events = temp;
//      uniqueID();
      return aEvent;
    } else {
      for (AEvent event : events) {
        if (event.getId() == aEvent.getId()) {
          event = aEvent;
//          event.setId(events.length + 1);
          return event;
        }
      }
    }
    return null;
  }

  @Override
  public AEvent findById(long id) {
    for (AEvent event : events) {
      if (event.getId() == id) {
        return event;
      }
    }
    ;
    return null;
  }

  @Override
  public boolean deleteById(long id) {
    for (int i = 0; i < events.length; i++) {
      if (events[i].getId() == id) {
        events[i] = null;
        return true;
      }
    }
    return false;
  }

}
