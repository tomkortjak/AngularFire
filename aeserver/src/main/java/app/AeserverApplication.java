package app;

import app.models.AEvent;
import app.models.Registration;
import app.repositories.AEventsRepositoryJpa;
import app.repositories.RegistrationRepositoryJpa;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootApplication
public class AeserverApplication implements CommandLineRunner {

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  AEventsRepositoryJpa eventRepo;

  @Autowired
  RegistrationRepositoryJpa registrationRepo;

  public static void main(String[] args) {
    SpringApplication.run(AeserverApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
      for(int i = 0; i < 4; i++) {
        AEvent randomEvent = new AEvent("ADE" + i, Date.valueOf(LocalDate.of(((int) (Math.random() * ((2018 - 2010) + 2010)) + 1), ((int) (Math.random() * ((12 - 1) + 1)) + 1), ((int) (Math.random() * ((25 - 1) + 1)) + 1))), Date.valueOf(LocalDate.now()), "Event", ((int) (Math.random() * ((3 - 1) + 1)) + 1) + "", Math.random() < 0.5, ((int) (Math.random() * ((90 - 1) + 1)) + 1), ((int) (Math.random() * ((12000 - 1) + 1)) + 1));
        System.out.println(randomEvent.getId() + "hier is code");
        eventRepo.save(randomEvent);
        for(int a = 0; a < 5; a++) {
          Registration randomRegistration = new Registration("32123", false, LocalDateTime.now());
          randomRegistration.addEvent(randomEvent);
          randomEvent.addRegistration(randomRegistration);
          registrationRepo.save(randomRegistration);
        }
      }

      logger.info("All events -> {}", eventRepo.findAll());
  }
}
