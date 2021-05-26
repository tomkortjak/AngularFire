package app.rest;

import app.models.AEvent;
import app.models.AEventStatus;
import app.models.Registration;
import app.repositories.AEventsRepository;
import app.repositories.RegistrationRepositoryJpa;
import app.views.EventView;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import exceptions.ForbiddenExeption;
import exceptions.UserNotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
public class AEventsController extends ResourceConfig {


  @Autowired
  AEventsRepository repository;

  @Autowired
  RegistrationRepositoryJpa regiRepo;

  private static ObjectMapper mapper = new ObjectMapper();

  @GetMapping("/randomevents")
  public List<AEvent> getAll() {
    return List.of(
      new AEvent("Test-event-A",
        Date.from(Instant.now()),
        Date.from(Instant.now().plusSeconds(40000)),
        "coole event",
        "0",
        true,
        350,
        20),
      new AEvent("Test-event-B",
        Date.from(Instant.now()),
        Date.from(Instant.now().plusSeconds(40000)),
        "coole event",
        "2",
        false,
        550,
        40)
    );
  }


  @GetMapping("/aevents")
  public List<AEvent> findAll
    (@RequestParam(required = false) String title,
     @RequestParam(required = false) Boolean status,
     @RequestParam(required = false) Integer minRegistrations) {
    if (title == null && status == null && minRegistrations == null) {
      return repository.findAll();
    } else if (title != null && status == null && minRegistrations == null) {
      return repository.findByQuery(title);
    } else if (title == null && status != null && minRegistrations == null) {
      return repository.findByQuery(status);
    } else if (title == null && status == null && minRegistrations != null) {
      return repository.findByQuery(minRegistrations);
    } else {
      System.out.println("Error too many paramaters");
      return null;
    }
  }

  @GetMapping("/aevents/{id}")
  @JsonView(EventView.OnlyIdTitleAndStatus.class)
  public AEvent findById(@PathVariable int id) {
    if (repository.findById(id) == null) {
      throw new UserNotFoundExeption();
    } else {
      return repository.findById(id);
    }
  }

  @GetMapping("/registrations/{id}}")
  public Registration findByIdRegi(@PathVariable int id) {
    if (regiRepo.findById(id) == null) {
      throw new UserNotFoundExeption();
    } else {
      return regiRepo.findById(id);
    }
  }

  @PostMapping("/aevents")
  public ResponseEntity<AEvent> save(@RequestBody AEvent event) {
    AEvent savedEvent = repository.save(event);

    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(savedEvent.getId()).toUri();

    return ResponseEntity.created(location)
      .body(savedEvent);
  }

  @PutMapping("/aevents/{id}")
  public ResponseEntity<Object> save(@PathVariable int id, @RequestBody AEvent event) {
    if (id != event.getId()) {
      throw new ForbiddenExeption();
    }
    AEvent savedEvent = repository.save(findById(id));

    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(savedEvent.getId()).toUri();

    return ResponseEntity.created(location)
      .body(savedEvent);
  }

  @DeleteMapping("/aevents/{id}")
  public ResponseEntity<Boolean> deleteById(@PathVariable Long id) {
    if (repository.findById(id) == null) {
      throw new UserNotFoundExeption();
    } else {
      boolean delEvent = repository.deleteById(id);
      return ResponseEntity.ok(delEvent);
    }
  }

  @PostMapping("/aevents/{id}/register")
  public ResponseEntity<Registration> addRegistration(@PathVariable Long id, @RequestBody Registration registration) {
    AEvent selectedEvent = repository.findById(id);
    if (selectedEvent != null && selectedEvent.getStatus() != AEventStatus.PUBLISHED) {
      if (registration.getSubmissionDate() == null) {
        registration.setSubmissionDate(LocalDateTime.now());
      }
      selectedEvent.addRegistration(registration);
      registration.addEvent(selectedEvent);
      regiRepo.save(registration);
    } else {
      System.out.println("error adding registration");
    }

    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(registration.getId()).toUri();

    return ResponseEntity.created(location)
      .body(registration);
  }
}

